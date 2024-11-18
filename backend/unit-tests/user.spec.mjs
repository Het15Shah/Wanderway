import * as chai from 'chai';
import * as sinon from 'sinon';
import { userSignIn, userSignUp } from '../controllers/user.js'
import User from '../models/user.js'

const expect = chai.expect;

describe('Test Suite for Log In', () => {
    describe('Test cases for sign in functionality',() => {
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
});