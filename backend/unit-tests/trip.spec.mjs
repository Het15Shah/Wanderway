import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import app from '../index.js';
import Trip from '../models/trip.js';

const chai = chaiModule.use(chaiHttp);
const expect = chaiModule.expect;

let tripId;

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
					expect(res).to.have.status(401);
					expect(res.body).to.have.all.keys('success','message');
					expect(res.body.success).to.be.false;
					expect(res.body.message).to.be.equal('Unauthorized: Token not provided');
					done();
				})
				.catch(function(err) {
					done(err);
				});
		});
    });
});