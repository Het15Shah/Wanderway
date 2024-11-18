import * as chai from 'chai';
import * as sinon from 'sinon';
import { userSignIn, userSignUp, userUpdate, getUserProfile, setUserProfile } from '../controllers/user.js'
import User from '../models/user.js';
import uploadOnCloudinary from '../utils/cloudinary.js';

const expect = chai.expect;

describe('Test Suite for User Controller', () => {
	describe('Test cases for sign in functionality', () => {
		let req, res;

		beforeEach(() => {
			req = {
				body: {
					email: 'test@example.com',
					password: 'password123'
				}
			};

			res = {
				status: sinon.stub().returnsThis(),
				json: sinon.stub(),
				cookie: sinon.stub()
			};
		});

		afterEach(() => {
			sinon.restore();
		});

		it('Successful sign in with valid credentials', async () => {
			const mockToken = 'fake-jwt-token';
			const matchPasswordStub = sinon.stub(User, 'matchPasswordAndGenerateToken')
				.resolves(mockToken);

			await userSignIn(req, res);

			expect(matchPasswordStub.calledOnce).to.be.true;
			expect(matchPasswordStub.calledWith(req.body.email, req.body.password)).to.be.true;
			expect(res.cookie.calledWith('token', mockToken, {
				domain: 'localhost',
				maxAge: 24 * 60 * 60 * 1000
			})).to.be.true;
			expect(res.status.calledWith(200)).to.be.true;
			expect(res.json.calledWith({
				success: true,
				message: "User Signed In Successfully"
			})).to.be.true;

			matchPasswordStub.restore();
		});

		it('Prompting the error message for invalid credentials', async () => {
			const errorMessage = 'Invalid credentials';
			const matchPasswordStub = sinon.stub(User, 'matchPasswordAndGenerateToken')
				.rejects(new Error(errorMessage));

			await userSignIn(req, res);

			expect(matchPasswordStub.calledOnce).to.be.true;
			expect(res.status.calledWith(200)).to.be.true;
			expect(res.json.calledWith({
				success: false,
				message: errorMessage
			})).to.be.true;

			matchPasswordStub.restore();
		});

		it('Handling missing email ID', async () => {
			req.body = { password: 'password123' };
			await userSignIn(req, res);

			expect(res.status.calledWith(200)).to.be.true;
			expect(res.json.calledWith({
				success: false,
				message: sinon.match.string
			})).to.be.true;
		});

		it('Handling missing password', async () => {
			req.body = { email: 'test@example.com' };
			await userSignIn(req, res);

			expect(res.status.calledWith(200)).to.be.true;
			expect(res.json.calledWith({
				success: false,
				message: sinon.match.string
			})).to.be.true;
		})

		it('Handling server errors', async () => {
			const serverError = new Error('Database connection failed');
			const matchPasswordStub = sinon.stub(User, 'matchPasswordAndGenerateToken')
				.rejects(serverError);

			// Call the signin function
			await userSignIn(req, res);

			// Verify the response
			expect(matchPasswordStub.calledOnce).to.be.true;
			expect(res.status.calledWith(200)).to.be.true;
			expect(res.json.calledWith({
				success: false,
				message: serverError.message
			})).to.be.true;
		});
	});

	describe('Test cases for sign up functionality', () => {
		let req, res, findOneStub, createStub;

		beforeEach(() => {
			findOneStub = sinon.stub(User, 'findOne');
			createStub = sinon.stub(User, 'create');

			req = {
				body: {
					userId: 'testuser123',
					fullName: 'Test User',
					email: 'test@example.com',
					password: 'password123'
				}
			};

			res = {
				status: sinon.stub().returnsThis(),
				json: sinon.stub()
			};
		});

		afterEach(() => {
			findOneStub.restore();
			createStub.restore();
		});

		it('If entered email is not registered already, create new user.', async () => {
			findOneStub.resolves(null);

			await userSignUp(req, res);

			const createdUserArgs = createStub.firstCall.args[0];
			expect(createdUserArgs).to.deep.include({
				userId: 'testuser123',
				fullName: 'Test User',
				email: 'test@example.com',
				password: 'password123'
			});
		});

		it('If entered email is already registered, give error', async () => {
			const existingUser = {
				userId: 'existinguser',
				email: 'test@example.com'
			};
			findOneStub.resolves(existingUser);

			await userSignUp(req, res);

			expect(findOneStub.calledOnceWith({ email: 'test@example.com' })).to.be.true;
			expect(createStub.notCalled).to.be.true;
			expect(res.status.calledWith(200)).to.be.true;
			expect(res.json.calledWith({
				success: false,
				message: 'User already exist'
			})).to.be.true;
		});

		it('handling database errors during user lookup', async () => {
			findOneStub.throws(new Error('Database connection error'));

			const consoleLogStub = sinon.stub(console, 'log');

			try {
				await userSignUp(req, res);
			} catch (error) {
				expect(consoleLogStub.calledOnce).to.be.true;
			} finally {
				consoleLogStub.restore();
			}
		});
	});

	describe('Test cases for functionality of updating information of users ', () => {
		let req, res, findOneStub, saveStub, cloudinaryStub;

		beforeEach(() => {
			findOneStub = sinon.stub(User, 'findOne');
			saveStub = sinon.stub(User.prototype, 'save');
			// cloudinaryStub = sinon.stub(uploadOnCloudinary)

			// Mock request and response objects
			req = {
				query: { userId: 'testuser123' },
				body: {
					fullName: 'Updated Name',
					email: 'updated@example.com',
					phoneNumber: '1234567890',
					address: 'New Address',
					gender: 'Other',
					role: 'admin',
					password: 'newpassword123'
				}
			};

			res = {
				status: sinon.stub().returnsThis(),
				json: sinon.stub()
			};
		});

		afterEach(() => {
			sinon.restore();
		});

		it('Update details if user exists in record.', async () => {
			const existingUser = new User({
				userId: 'testuser123',
				fullName: 'Original Name',
				email: 'original@example.com'
			});

			findOneStub.resolves(existingUser);
			saveStub.resolves(existingUser);

			await userUpdate(req, res);

			expect(findOneStub.calledOnceWith({ userId: 'testuser123' })).to.be.true;
			expect(existingUser.fullName).to.equal('Updated Name');
			expect(existingUser.email).to.equal('updated@example.com');
			expect(existingUser.phoneNumber).to.equal('1234567890');
		});

		it('Give error if user is not found', async () => {
			findOneStub.resolves(null);

			await userUpdate(req, res);

			expect(findOneStub.calledOnceWith({ userId: 'testuser123' })).to.be.true;
			expect(res.status.calledWith(404)).to.be.true;
			expect(res.json.firstCall.args[0]).to.deep.equal({ message: "User not found" });
		});

		it('Handling password update with salt and hash', async () => {
			req = {
				query: { userId: 'testuser123' },
				body: {
					password: 'newpassword123'
				}
			};

			const existingUser = new User({
				userId: 'testuser123',
				fullName: 'Original Name'
			});
			findOneStub.resolves(existingUser);
			saveStub.resolves(existingUser);

			await userUpdate(req, res);

			expect(existingUser.salt).to.exist;
			expect(existingUser.password).to.exist;
			expect(existingUser.password).to.not.equal(req.body.password);
		});
	});

	describe('Test cases for getUserProfile', () => {
		let findOneStub;

		beforeEach(() => {
			findOneStub = sinon.stub(User, 'findOne');
		});

		afterEach(() => {
			findOneStub.restore();
		});

		it('Return User Profile if it exists', async () => {
			const mockUser = {
				email: 'test@example.com',
				name: 'Test User',
			};

			findOneStub.withArgs({ email: 'test@example.com' }).resolves(mockUser);

			const req = {
				user: { email: 'test@example.com' }
			};
			const res = {
				status: sinon.stub().returnsThis(),
				json: sinon.stub()
			};

			await getUserProfile(req, res);

			expect(res.status.calledWith(200)).to.be.true;
			expect(res.json.calledWith({ success: true, user: mockUser })).to.be.true;
		});

		it('Return 404 if user is not found', async () => {
			findOneStub.withArgs({ email: 'nonexistent@example.com' }).resolves(null);

			const req = {
				user: { email: 'nonexistent@example.com' }
			};
			const res = {
				status: sinon.stub().returnsThis(),
				send: sinon.stub()
			};

			await getUserProfile(req, res);

			expect(res.status.calledWith(404)).to.be.true;
			expect(res.send.calledWith('User not found')).to.be.true;
		});

		it('Handle internal server error', async () => {
			findOneStub.withArgs({ email: 'error@example.com' }).throws(new Error('Database error'));

			const req = {
				user: { email: 'error@example.com' }
			};
			const res = {
				status: sinon.stub().returnsThis(),
				send: sinon.stub()
			};

			await getUserProfile(req, res);

			expect(res.status.calledWith(500)).to.be.true;
			expect(res.send.calledWith({ success: false, message: 'Internal Server Error' })).to.be.true;
		});
	});

	describe('Test cases for setUserProfile', () => {
		let findOneStub, saveStub;

		beforeEach(() => {
			findOneStub = sinon.stub(User, 'findOne');
			saveStub = sinon.stub(User.prototype, 'save');
		});

		afterEach(() => {
			findOneStub.restore();
			saveStub.restore();
		});

		it('Create a new user profile from entered data', async () => {
			const req = {
				body: {
					fullName: 'John Doe',
					email: 'john@example.com',
					phoneNumber: '1234567890',
					address: '123 Test St',
					gender: 'Male'
				}
			};
			const res = {
				status: sinon.stub().returnsThis(),
				json: sinon.stub()
			};

			findOneStub.resolves(null);
			saveStub.resolves();

			await setUserProfile(req, res);

			expect(res.status.calledWith(201)).to.be.true;
			expect(res.json.firstCall.args[0].message).to.equal('User created successfully');
			expect(res.json.firstCall.args[0].user).to.be.an('object');
			expect(res.json.firstCall.args[0].user.fullName).to.equal('John Doe');
		});

		it('Return 400 if required fields are missing', async () => {
			const req = {
				body: {
					fullName: 'John Doe'
				}
			};
			const res = {
				status: sinon.stub().returnsThis(),
				json: sinon.stub()
			};

			await setUserProfile(req, res);

			expect(res.status.calledWith(400)).to.be.true;
			expect(res.json.firstCall.args[0].message).to.equal('Full Name, Email, and Phone Number are required');
		});

		it('Return 409 if user with email already exists', async () => {
			const req = {
				body: {
					fullName: 'John Doe',
					email: 'existing@example.com',
					phoneNumber: '1234567890'
				}
			};
			const res = {
				status: sinon.stub().returnsThis(),
				json: sinon.stub()
			};

			findOneStub.resolves({ email: 'existing@example.com' });

			await setUserProfile(req, res);

			expect(res.status.calledWith(409)).to.be.true;
			expect(res.json.firstCall.args[0].message).to.equal('User with this email already exists');
		});

		it('Handle internal server error', async () => {
			const req = {
				body: {
					fullName: 'John Doe',
					email: 'john@example.com',
					phoneNumber: '1234567890'
				}
			};
			const res = {
				status: sinon.stub().returnsThis(),
				json: sinon.stub()
			};

			findOneStub.throws(new Error('Database connection error'));

			await setUserProfile(req, res);

			expect(res.status.calledWith(500)).to.be.true;
			expect(res.json.firstCall.args[0].message).to.equal('Internal Server Error');
		});

		it('Use default values when not provided', async () => {
			const req = {
				body: {
					fullName: 'John Doe',
					email: 'john@example.com',
					phoneNumber: '1234567890'
				}
			};
			const res = {
				status: sinon.stub().returnsThis(),
				json: sinon.stub()
			};

			findOneStub.resolves(null);
			saveStub.resolves();

			await setUserProfile(req, res);

			const createdUser = res.json.firstCall.args[0].user;
			expect(createdUser.profileImageURL).to.equal('/images/User-Avatar-in-Suit-PNG.png');
			expect(createdUser.role).to.equal('USER');
		});
	});
});