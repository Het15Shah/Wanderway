import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import User from '../models/user.js';
import app from '../index.js';
import fs from 'fs';

const chai = chaiModule.use(chaiHttp);
const expect = chaiModule.expect;

describe('Test Suite for User Controller', function () {
	this.timeout(20000);
	describe('Test cases for sign in functionality', function () {
		it('Successful sign in with valid credentials', function (done) {
			chai.request.execute(app)
				.post('/api/user/signin')
				.send({
					'email': 'ram@gmail.com',
					'password': 'ram#2005'
				})
				.then(function (res) {
					expect(res).to.have.status(200);
					expect(res.body).to.have.all.keys('success', 'message');
					expect(res.body.success).to.be.true;
					expect(res.body.message).to.be.equal('User Signed In Successfully');
					done();
				})
				.catch(function (err) {
					done(err);
				});
		});

		it('Prompting the error message for invalid credentials', function (done) {
			chai.request.execute(app)
				.post('/api/user/signin')
				.send({
					'email': 'ram@gmail.com',
					'password': 'wrongpassword123'
				})
				.then(function (res) {
					expect(res).to.have.status(200);
					expect(res.body).to.have.all.keys('success', 'message');
					expect(res.body.success).to.be.false;
					done();
				})
				.catch(function (err) {
					done(err);
				});
		});

		it('Handling missing email ID', function (done) {
			chai.request.execute(app)
				.post('/api/user/signin')
				.send({
					'password': 'wrongpassword123'
				})
				.then(function (res) {
					expect(res).to.have.status(400);
					expect(res.body).to.have.all.keys('success', 'message');
					expect(res.body.success).to.be.false;
					expect(res.body.message).to.be.equal('email cannot be missing');
					done();
				})
				.catch(function (err) {
					done(err);
				});
		});

		it('Handling missing password', function (done) {
			chai.request.execute(app)
				.post('/api/user/signin')
				.send({
					'email': 'ram@gmail.com'
				})
				.then(function (res) {
					expect(res).to.have.status(400);
					expect(res.body).to.have.all.keys('success', 'message');
					expect(res.body.success).to.be.false;
					expect(res.body.message).to.be.equal('password cannot be missing');
					done();
				})
				.catch(function (err) {
					done(err);
				});
		});
	});

	describe('Test cases for sign up functionality', function() {
		it('If entered email is not registered already, create new user.', function(done) {
			chai.request.execute(app)
			.post('/api/user/signup')
			.type('form')
			.send({
				'userId': 'dp1405',
				'fullName': 'Darpan Lunagariya',
				'email': '202201462@daiict.ac.in',
				'password': 'mypasswordforwanderways@@'
			})
			.then(function(res) {
				expect(res).to.have.status(200);
				expect(res.body).to.have.all.keys('success','message');
				expect(res.body.success).to.be.true;
				expect(res.body.message).to.be.equal('User Signed up Successfully');
				done();
			})
			.catch(function(err) {
				done(err);
			});
		});

		it('If entered email is already registered, give error', async () => {
			chai.request.execute(app)
			.post('/api/user/signup')
			.type('form')
			.send({
				'userId': 'dp1405',
				'fullName': 'Darpan Lunagariya',
				'email': '202201462@daiict.ac.in',
				'password': 'mypasswordforwanderways@@'
			})
			.then(function(res) {
				expect(res).to.have.status(200);
				expect(res.body).to.have.all.keys('success','message');
				expect(res.body.success).to.be.false;
				expect(res.body.message).to.be.equal('User already exist');
				done();
			})
			.catch(function(err) {
				done(err);
			});
		});
	});

	describe('Test cases for functionality of updating information of users ', () => {
		it('Update details if user exists in record.', function (done) {
			chai.request.execute(app)
			.post('/api/user/update')
			.query({userId: 'darpan_1405'})
			.field({
				'fullName': 'Darpan',
				'email': 'darpan.ifest@gmail.com',
				'password': 'mypasswordforwanderways@@',
				'address': 'DA-IICT, Gandhinagar',
				'phoneNumber': '9328366525',
				'gender': 'Male',
				'role': 'ADMIN'
			})
			.attach('profileImage',fs.readFileSync('./images/User-Avatar-in-Suit-PNG.png'),'image.png')
			.then(function(res) {
				expect(res).to.have.status(200);
				expect(res.body).to.have.all.keys('user','message');
				expect(res.body.message).to.be.equal('User updated successfully');
				done();
			})
			.catch(function(err) {
				done(err);
			});
		});

		it('Give error if user is not found', function (done) {
			chai.request.execute(app)
				.post('/api/user/update')
				.query({ userId: 'doesNotExist' })
				.field({
					'fullName': 'Darpan',
					'email': 'darpan@gmail.com',
					'password': 'mypasswordforwanderways@@',
					'address': 'DA-IICT, Gandhinagar',
					'phoneNumber': '9328366525',
					'gender': 'Male',
					'role': 'ADMIN'
				})
				.then(function (res) {
					expect(res).to.have.status(404);
					expect(res.body).to.have.all.keys('message');
					expect(res.body.message).to.be.equal('User not found');
					done();
				})
				.catch(function (err) {
					done(err);
				});
		});
	});

	describe('Test cases for getUserProfile', function () {
		it('Return User Profile if it exists', async function () {
			const agent = chai.request.agent(app);

			try {
				const signInRes = await agent.post('/api/user/signin')
					.send({
						'email': 'ram@gmail.com',
						'password': 'ram#2005'
					});

				expect(signInRes).to.have.cookie('token');

				const profileRes = await agent
					.get('/api/user/myProfile');

				expect(profileRes).to.have.status(200);
				expect(profileRes.body).to.have.all.keys('success', 'user');
				expect(profileRes.body.success).to.be.true;
			}
			catch (err) {
				throw err;
			}
			finally {
				await agent.close();
			}
		});

		it('User is not authorized', function(done) {
			chai.request.execute(app)
				.get('/api/user/myProfile')
				.then(function(res) {
					expect(res).to.have.status(200);
					expect(res.body).to.have.all.keys('success','message');
					expect(res.body.success).to.be.false;
					expect(res.body.message).to.be.equal('You are not Authenticated!');
					done();
				})
				.catch(function(err) {
					done(err);
				});
		});
	});
});