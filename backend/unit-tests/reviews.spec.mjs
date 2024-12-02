import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import app from '../index.js';
import Review from '../models/review.js';
import mongodb from 'mongodb';

const chai = chaiModule.use(chaiHttp);
const expect = chaiModule.expect;

describe('Test suite for reviews controller', function () {
	this.timeout(20000);

	describe('Test cases for add review functionality', function () {
		it('Add a review if user is already authenticated', async function () {
			const agent = chai.request.agent(app);

			try {
				const signInRes = await agent.post('/api/user/signin')
					.send({
						'email': 'ram@gmail.com',
						'password': 'ram#2005'
					});

				expect(signInRes).to.have.cookie('token');

				const reviewRes = await agent.post('/api/review')
					.send({
						'rating': '4',
						'comment': 'Trip booking functionality could have been better'
					});

				expect(reviewRes).to.have.status(201);
				expect(reviewRes.body).to.have.all.keys('message', 'review');
				expect(reviewRes.body.message).to.be.equal('Review created successfully');
			}
			catch (err) {
				throw err;
			}
			finally {
				await agent.close();
			}
		});

		it('Prompt an error if user is not authenticated', function(done) {
			chai.request.execute(app)
				.post('/api/review')
				.send({
					'rating': '4',
					'comment': 'Trip booking functionality could have been better'
				})
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

	describe('Test cases for get all review functionality',function() {
		it('Check if all the reviews are retained or not',function(done) {
			chai.request.execute(app)
				.get('/api/review')
				.then(function (res){
					expect(res).to.have.status(200);
					expect(res.body).to.be.an('array');

					done();
				})
				.catch(function (err){
					done(err);
				});
		});
	});

	describe('Test cases for delete review functionality',function() {
		it('Delete a review if user is authenticated as Admin',async function() {
			const agent = chai.request.agent(app);

			try {
				const signInRes = await agent.post('/api/user/signin')
					.send({
						'email': 'ram@gmail.com',
						'password': 'ram#2005'
					});

				expect(signInRes).to.have.cookie('token');

				const review = await Review.findOne({comment: 'Trip booking functionality could have been better'});

				const delRes = await agent.delete(`/api/review/${review.id}`)
				
				expect(delRes).to.have.status(200);
				expect(delRes.body).to.have.all.keys('message');
				expect(delRes.body.message).to.be.equal('Review deleted successfully');
			}
			catch (err) {
				throw err;
			}
			finally {
				await agent.close();
			}
		});

		it('Do not delete a review if user is authenticated as normal user',async function() {
			const agent = chai.request.agent(app);

			try {
				const signInRes = await agent.post('/api/user/signin')
					.send({
						'email': 'test.user.darpan@gmail.com',
						'password': 'testUserDarpan'
					});

				expect(signInRes).to.have.cookie('token');

				const review = await Review.findOne({comment: 'Nice website for exploring new location and generating trips'});

				const delRes = await agent.delete(`/api/review/${review.id}`);
				
				expect(delRes).to.have.status(403);
				expect(delRes.body).to.have.all.keys('message');
				expect(delRes.body.message).to.be.equal('Access denied. Admins only.');
			}
			catch (err) {
				throw err;
			}
			finally {
				await agent.close();
			}
		});

		it('Do not delete a review if user is not authenticated',async function() {
			try{
				const review = await Review.findOne({comment: 'Nice website for exploring new location and generating trips'});

				const delRes = await chai.request.execute(app)
					.delete(`/api/review/${review.id}`)
				
				expect(delRes).to.have.status(400);
				expect(delRes.body).to.have.all.keys('message','success');
				expect(delRes.body.success).to.be.false;
				expect(delRes.body.message).to.be.equal('Invalid token');
			}
			catch(err) {
				throw err;
			}
		});
		
		it('Prompt the message if admin tries to delete a review that does not exist.',async function() {
			const agent = chai.request.agent(app);

			try {
				const signInRes = await agent.post('/api/user/signin')
					.send({
						'email': 'ram@gmail.com',
						'password': 'ram#2005'
					});

				expect(signInRes).to.have.cookie('token');

				const id = new mongodb.ObjectId();

				const delRes = await agent.delete(`/api/review/${id}`)
				
				expect(delRes).to.have.status(404);
				expect(delRes.body).to.have.all.keys('message');
				expect(delRes.body.message).to.be.equal('Review not found');
			}
			catch (err) {
				throw err;
			}
			finally {
				await agent.close();
			}
		});
	});
});
