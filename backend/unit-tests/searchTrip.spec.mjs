import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import app from '../index.js';
import * as sinon from 'sinon';
import Trip from '../models/trip.js';
import { searchTrip } from '../controllers/searchTrip.js';

const chai = chaiModule.use(chaiHttp);
const expect = chaiModule.expect;

describe('Test-cases for searchTrip Functionality', function() {
	this.timeout(20000);

	it('Search trips using filters', function(done) {
		chai.request.execute(app)
		.get('/api/searchTrip')
		.send({
			'destination': 'Paris',
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