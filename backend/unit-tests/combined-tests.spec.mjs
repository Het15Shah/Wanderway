import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import app from '../index.js';
import fs from 'fs';
import Trip from '../models/trip.js';
import Review from '../models/review.js';
import mongodb from 'mongodb';

const chai = chaiModule.use(chaiHttp);
const expect = chaiModule.expect;

const tripIdToBook = '673c7260d17bce3b30bd13b8';
let tripId;

describe('Test Suite for User Controller', function () {
	this.timeout(20000);
	describe('Test cases for sign in functionality', function () {
		it('Successful sign in with valid credentials', async function () {
			try{
				const res = await chai.request.execute(app)
				.post('/api/user/signin')
				.send({
					'email': 'ram@gmail.com',
					'password': 'ram#2005'
				});

				expect(res).to.have.status(200);
				expect(res.body).to.have.all.keys('success', 'message');
				expect(res.body.success).to.be.true;
				expect(res.body.message).to.be.equal('User Signed In Successfully');
			}
			catch(err){
				throw err;
			}
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
				'userId': 'testUser',
				'fullName': 'Testing User',
				'email': 'testing.user@test.com',
				'password': 'testing.user'
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

	describe('Test cases for delete account functionality', function() {
		it('Delete account if user is authenticated',async function() {
			const agent = chai.request.agent(app);

			try {
				const signInRes = await agent.post('/api/user/signin')
					.send({
						'email': 'testing.user@test.com',
						'password': 'testing.user'
					});

				expect(signInRes).to.have.cookie('token');

				const deleteRes = await agent.post('/api/user/delete');

				expect(deleteRes).to.have.status(200);
				expect(deleteRes.body).to.have.all.keys('message', 'success');
				expect(deleteRes.body.message).to.be.equal('Account deleted successfully');
			}
			catch (err) {
				throw err;
			}
			finally {
				await agent.close();
			}
		});

		it('Prompt error message if user is not authenticated', function(done){
			chai.request.execute(app)
				.post('/api/user/delete')
				.then(function(res) {
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

	describe('Test cases for log out functionality', function() {
		it('Log out user from the system if user is already authenticated.', async function(){
			const agent = chai.request.agent(app);

			try {
				const signInRes = await agent.post('/api/user/signin')
					.send({
						'email': 'ram@gmail.com',
						'password': 'ram#2005'
					});

				expect(signInRes).to.have.cookie('token');

				const logOutRes = await agent.get('/api/logout');
				expect(logOutRes).to.have.status(201);
				expect(logOutRes.body).to.have.all.keys('success');
				expect(logOutRes.body.success).to.be.true;
				expect(logOutRes).to.not.have.cookie('token');
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
				.get('/api/logout')
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

describe('Test Suite for trip controller', function () {
    this.timeout(20000);

    describe('Test cases for add trip functionality', function () {
        it('Add new trip if all the required field is provided', function (done) {
            chai.request.execute(app).post('/api/trip')
                .send({
                    "title": "Romantic Hot Air Balloon Journey in Tuscany",
                    "destination": "Tuscany, Italy",
                    "startDate": "2024-07-23T00:00:00.000Z",
                    "endDate": "2024-07-26T00:00:00.000Z",
                    "itinerary": [
                        {
                            "day": "1",
                            "modeOfTransportation": "private car",
                            "hotel": {
                                "name": "Belmond Castello di Casole",
                                "location": "Casole d'Elsa"
                            },
                            "activities": [
                                {
                                    "time": "14:00",
                                    "description": "Arrival at Florence Airport (FLR). Private transfer to Belmond Castello di Casole. Relax and enjoy the scenic Tuscan countryside.",
                                    "location": "Casole d'Elsa"
                                }
                            ]
                        },
                        {
                            "day": "2",
                            "modeOfTransportation": "private car with chauffeur",
                            "hotel": {
                                "name": "Belmond Castello di Casole",
                                "location": "Casole d'Elsa"
                            },
                            "activities": [
                                {
                                    "time": "06:00",
                                    "description": "Early morning hot air balloon ride over Tuscany's vineyards and rolling hills. Followed by a gourmet breakfast with Prosecco in the countryside.",
                                    "location": "Chianti Region"
                                },
                                {
                                    "time": "14:00",
                                    "description": "Visit to a local vineyard for wine tasting and a tour of the winemaking process.",
                                    "location": "Chianti Region"
                                }
                            ]
                        },
                        {
                            "day": "3",
                            "modeOfTransportation": "private car",
                            "hotel": {
                                "name": "Il Borro Relais & Chateaux",
                                "location": "San Giustino Valdarno"
                            },
                            "activities": [
                                {
                                    "time": "10:00",
                                    "description": "Transfer to San Giustino Valdarno. Afternoon hot air balloon ride above medieval villages and olive groves.",
                                    "location": "Valdarno"
                                }
                            ]
                        },
                        {
                            "day": "4",
                            "modeOfTransportation": "private car with chauffeur",
                            "hotel": {
                                "name": "null",
                                "location": "null"
                            },
                            "activities": [
                                {
                                    "time": "10:00",
                                    "description": "Departure from Florence Airport (FLR). Private transfer.",
                                    "location": "Florence"
                                }
                            ]
                        }
                    ],
                    "budget": "10000",
                    "highlights": [
                        "Luxury accommodations in premium Tuscan estates",
                        "Private hot air balloon rides with stunning views",
                        "Gourmet breakfast in the countryside",
                        "Exclusive wine tasting experience in Chianti",
                        "Chauffeured transportation"
                    ],
                    "includedServices": [
                        "All accommodation (as specified)",
                        "All hot air balloon rides (including pilot)",
                        "Private transportation (as specified)",
                        "Gourmet breakfast and wine tasting"
                    ],
                    "imageURL": "https://example.com/tuscany_hot_air_balloon.jpg",
                })
                .then((res) => {
                    expect(res).to.have.status(201);
                    done();
                })
                .catch((err) => {
                    throw err;
                });
        });

        it('Do not add trip if required field is not provided', function (done) {
            chai.request.execute(app).post('/api/trip')
                .send({
                    "title": "Jungle Safari"
                })
                .then((res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).have.a.property('message');
                    done();
                })
                .catch((err) => {
                    throw err;
                });
        });
    });

    describe('Test cases for get trip functionality', function () {
        it('Get all the trips', function (done) {
            chai.request.execute(app).get('/api/trip')
                .end((err, res) => {
                    if (err) done(err);
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body).to.not.be.empty;
                    done();
                });
        });

        it('Get a specific trip by provided id', async function() {
            try{
                const trip = await Trip.findOne({title: 'Romantic Hot Air Balloon Journey in Tuscany'});
                tripId = trip.id;
                const res = await chai.request.execute(app).get(`/api/trip/${tripId}`);

                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.a.property('title');
                expect(res.body).to.have.a.property('destination');
            }
            catch(err){
                throw err;
            }
        });
    });

    describe('Test cases for delete trip functionality', function () {
        it('Delete a specific trip by provided id if the role is Admin', async function () {
            const agent = chai.request.agent(app);

			try {
				const signInRes = await agent.post('/api/user/signin')
					.send({
						'email': 'ram@gmail.com',
						'password': 'ram#2005'
					});

				expect(signInRes).to.have.cookie('token');

				const delRes = await agent.delete(`/api/trip/${tripId}`)
				
				expect(delRes).to.have.status(200);
                expect(delRes.body).to.be.an('object');
                expect(delRes.body).to.have.property('message', 'Trip deleted successfully');
			}
			catch (err) {
				throw err;
			}
			finally {
				await agent.close();
			}
        });

        it('Do not Delete a specific trip by provided id if the role is user', async function () {
            const agent = chai.request.agent(app);

			try {
				const signInRes = await agent.post('/api/user/signin')
					.send({
						'email': 'test.user.darpan@gmail.com',
						'password': 'testUserDarpan'
					});

				expect(signInRes).to.have.cookie('token');

				const delRes = await agent.delete(`/api/trip/${tripId}`)
				
				expect(delRes).to.have.status(403);
                expect(delRes.body).to.have.all.keys('message');
                expect(delRes.body).to.have.property('message', 'Access denied. Admins only.');
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
				.delete(`/api/trip/${tripId}`)
				.then(function(res) {
					expect(res).to.have.status(400);
					expect(res.body).to.have.all.keys('success','message');
					expect(res.body.success).to.be.false;
					expect(res.body.message).to.be.equal('Invalid token');
					done();
				})
				.catch(function(err) {
					done(err);
				});
		});
    });
});

describe('Test-cases for searchTrip Functionality', function() {
	this.timeout(20000);

	it('Search trips using destination', function(done) {
		chai.request.execute(app)
		.get('/api/searchTrip')
		.query({
			'destination': 'Paris'
		})
		.then(function(res) {
			expect(res).to.have.status(200);
			done();
		})
		.catch(function(err) {
			done(err);
		});
	});

	it('Search trips using days', function(done) {
		chai.request.execute(app)
		.get('/api/searchTrip')
		.send({
			'days': '3'
		})
		.then(function(res) {
			expect(res).to.have.status(200);
			done();
		})
		.catch(function(err) {
			done(err);
		});
	});

	it('Search trips using maxBudget', function(done) {
		chai.request.execute(app)
		.get('/api/searchTrip')
		.send({
			'maxBudget': '8000'
		})
		.then(function(res) {
			expect(res).to.have.status(200);
			done();
		})
		.catch(function(err) {
			done(err);
		});
	});

	it('Search trips using all three factors', function(done) {
		chai.request.execute(app)
		.get('/api/searchTrip')
		.query({
			'destination': 'Paris',
			'days': '3',
			'maxBudget': '8000'
		})
		.then(function(res) {
			expect(res).to.have.status(200);
			done();
		})
		.catch(function(err) {
			done(err);
		});
	});
});

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

				const bookingRes = await agent.post(`/api/myTrip/book/${tripIdToBook}`)

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
				.post(`/api/myTrip/book/${tripIdToBook}`)
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

describe('Test-cases for creating a custom trip Functionality', function() {
	this.timeout(30000);

	it('Create a trip if destination, activites and budget is provided by user', function(done) {
		chai.request.execute(app)
		.post('/api/customTrip')
		.send({
			'destination': 'Paris',
            'activities': 'River rafting',
            'budget': 'expensive'
		})
		.then(function(res) {
			expect(res).to.have.status(200);
            expect(res.body).to.have.property('success');
            expect(res.body.success).to.be.true;
			done();
		})
		.catch(function(err) {
			done(err);
		});
	});
});