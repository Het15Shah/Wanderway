import * as chai from 'chai';
import * as sinon from 'sinon';
import Trip from '../models/trip.js';
import { searchTrip } from '../controllers/searchTrip.js';

const { expect } = chai;

describe('Test-cases for searchTrip Functionality', () => {
  let findStub;

  beforeEach(() => {
    findStub = sinon.stub(Trip, 'find');
  });

  afterEach(() => {
    findStub.restore();
  });

  const mockTrips = [
    { 
      destination: 'Paris', 
      budget: 1000, 
      itinerary: [{day: 1}, {day: 2}, {day: 3}] 
    },
    { 
      destination: 'Paris', 
      budget: 1500, 
      itinerary: [{day: 1}, {day: 2}] 
    }
  ];

  it('Search trips by destination', async () => {
    findStub.resolves(mockTrips);

    const req = {
      query: { destination: 'Paris' }
    };
    const res = {
      json: sinon.spy()
    };

    await searchTrip(req, res);

    expect(findStub.calledOnceWith({ destination: 'Paris' })).to.be.true;
    expect(res.json.calledOnce).to.be.true;
    
    const responseData = res.json.firstCall.args[0];
    expect(responseData).to.deep.equal(mockTrips);
  });

  it('Search trips by maximum budget', async () => {
    findStub.resolves(mockTrips);

    const req = {
      query: { maxBudget: '1200' }
    };
    const res = {
      json: sinon.spy()
    };

    await searchTrip(req, res);

    expect(findStub.calledOnceWith({ budget: { $lte: 1200 } })).to.be.true;
    expect(res.json.calledOnce).to.be.true;
  });

  it('Filter trips by days', async () => {
    findStub.resolves(mockTrips);

    const req = {
      query: { days: '2' }
    };
    const res = {
      json: sinon.spy()
    };

    await searchTrip(req, res);

    const responseData = res.json.firstCall.args[0];
    expect(responseData.length).to.equal(1);
    expect(responseData[0].itinerary.length).to.equal(2);
  });

  it('Handle multiple search criteria', async () => {
    findStub.resolves(mockTrips);

    const req = {
      query: { 
        destination: 'Paris', 
        maxBudget: '1200',
        days: '2' 
      }
    };
    const res = {
      json: sinon.spy()
    };

    await searchTrip(req, res);

    expect(findStub.calledOnceWith({ 
      destination: 'Paris', 
      budget: { $lte: 1200 } 
    })).to.be.true;
  });

  it('Handle database errors', async () => {
    const errorMessage = 'Database connection error';
    findStub.rejects(new Error(errorMessage));

    const req = {
      query: {}
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await searchTrip(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledOnce).to.be.true;
    
    const responseData = res.json.firstCall.args[0];
    expect(responseData.message).to.equal(errorMessage);
  });
});