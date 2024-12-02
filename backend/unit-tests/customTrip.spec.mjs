import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import app from '../index.js';

const chai = chaiModule.use(chaiHttp);
const expect = chaiModule.expect;

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
            expect(res.body).to.have.all.keys('success');
            expect(res.body.success).to.be.true;
			done();
		})
		.catch(function(err) {
			done(err);
		});
	});
});