import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import app from '../index.js';

const chai = chaiModule.use(chaiHttp);
const expect = chaiModule.expect;

describe('Test-cases for searchTrip Functionality', function() {
	this.timeout(20000);

	it('Search trips using destination', function(done) {
		chai.request.execute(app)
		.get('/api/searchTrip')
		.send({
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
		.send({
			'destination': 'Paris',
			'days': '3',
			'maxBudget': '8000'
		})
		.then(function(res) {
			console.log(res.body);
			expect(res).to.have.status(200);
			done();
		})
		.catch(function(err) {
			done(err);
		});
	});
});