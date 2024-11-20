import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import app from '../index.js';
import mongodb from 'mongodb';

const chai = chaiModule.use(chaiHttp);
const expect = chaiModule.expect;

const id = '673c7260d17bce3b30bd13b8'

describe('Test suite for myTrip controller', function() {
	this.timeout(20000);

	describe('Test cases for book trip functionality',function() {
		it('A trip should be booked if authenticated user tries to book a trip',async function() {
			const agent = chai.request.agent(app);

			try {
				const signInRes = await agent.post('/api/user/signin')
					.send({
						'email': 'ram@gmail.com',
						'password': 'ram#2005'
					});

				expect(signInRes).to.have.cookie('token');

				const bookingRes = await agent.post(`/api/myTrip/book/${id}`)

				expect(bookingRes).to.have.status(200);
				expect(bookingRes.body).to.have.all.keys('message');
				expect(bookingRes.body.message).to.be.equal('Trip Booked Successfully!!');
			}
			catch (err) {
				throw err;
			}
			finally {
				await agent.close();
			}
		});

		it('prompt a message if user is not authenticated and do not book a trip', function(done) {
			chai.request.execute(app)
				.post(`/api/myTrip/book/${id}`)
				.then(function (res){
					expect(res).to.have.status(200);
					expect(res.body).to.have.all.keys('message', 'success');
					expect(res.body.success).to.be.false;
					expect(res.body.message).to.be.equal('You are not Authenticated!');

					done();
				})
				.catch(function (err){
					done(err);
				});
		});
	});

	describe('Test cases for getting all booked trips functionality', function() {
		it('All booked trips should be returned if user is authenticated', async function() {
			const agent = chai.request.agent(app);

			try {
				const signInRes = await agent.post('/api/user/signin')
					.send({
						'email': 'ram@gmail.com',
						'password': 'ram#2005'
					});

				expect(signInRes).to.have.cookie('token');

				const bookingRes = await agent.get('/api/myTrip/alltrips');
				expect(bookingRes).to.have.status(200);
				expect(bookingRes).to.have.property('body');
			}
			catch (err) {
				throw err;
			}
			finally {
				await agent.close();
			}
		});

		it('prompt a message if user is not authenticated', function(done) {
			chai.request.execute(app)
				.get('/api/myTrip/alltrips')
				.then(function (res){
					expect(res).to.have.status(200);
					expect(res.body).to.have.all.keys('message', 'success');
					expect(res.body.success).to.be.false;
					expect(res.body.message).to.be.equal('You are not Authenticated!');

					done();
				})
				.catch(function (err){
					done(err);
				});
		});
	});

	describe('Test cases for cancel booked trip functionality',function() {
		it('Cancel the booked trip if it exists',function(done) {
			const existingId = '673e2ceb7191fe8c62c1ecbd';
			chai.request.execute(app)
				.post(`/api/myTrip/cancel/${existingId}`)
				.then(function(res) {
					expect(res).to.have.status(200);
					expect(res.body).to.have.all.keys('message', 'canceledTrip');
					expect(res.body.message).to.be.equal('Trip canceled successfully');

					done();
				})
				.catch(function(err) {
					done(err);
				});
		});

		it('Prompt the message if the trip does not exist',function(done) {
			const dummyId = new mongodb.ObjectId();
			chai.request.execute(app)
				.post(`/api/myTrip/cancel/${dummyId}`)
				.then(function(res) {
					expect(res).to.have.status(404);
					expect(res.body).to.have.all.keys('message');
					expect(res.body.message).to.be.equal('Booking not found');

					done();
				})
				.catch(function(err) {
					done(err);
				});
		});
	});
});