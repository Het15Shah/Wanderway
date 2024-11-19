import * as chai from 'chai';
import * as sinon from 'sinon';
import MyTrip from '../models/myTrip.js';
import { cancelTrip , bookTrip } from '../controllers/myTrip.js';

const expect = chai.expect;


describe('Test-cases for cancelTrip', () => {
  let findByIdAndUpdateStub;

  beforeEach(() => {
    findByIdAndUpdateStub = sinon.stub(MyTrip, 'findByIdAndUpdate');
  });

  afterEach(() => {
    findByIdAndUpdateStub.restore();
  });

  it('Cancel a trip', async () => {
    const mockTrip = { 
      _id: 'tripId123', 
      status: 'canceled' 
    };

    findByIdAndUpdateStub.resolves(mockTrip);

    const req = {
      params: { id: 'tripId123' }
    };
    const res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };

    await cancelTrip(req, res);

    expect(res.status.notCalled).to.be.true;
    expect(res.json.calledOnce).to.be.true;
    const responseData = res.json.firstCall.args[0];
    
    expect(responseData.message).to.equal('Trip canceled successfully');
    expect(responseData.canceledTrip).to.deep.equal(mockTrip);
  });

  it('Return 404 if trip is not found', async () => {
    findByIdAndUpdateStub.resolves(null);

    const req = {
      params: { id: 'nonExistentTripId' }
    };
    const res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };

    await cancelTrip(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledOnce).to.be.true;
    const responseData = res.json.firstCall.args[0];
    
    expect(responseData.message).to.equal('Booking not found');
  });

  it('Handle errors and return 500 status', async () => {
    const errorMessage = 'Database connection error';
    findByIdAndUpdateStub.rejects(new Error(errorMessage));

    const req = {
      params: { id: 'tripId123' }
    };
    const res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };

    await cancelTrip(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledOnce).to.be.true;
    const responseData = res.json.firstCall.args[0];
    
    expect(responseData.message).to.equal(errorMessage);
  });

  it('Call findByIdAndUpdate with correct parameters', async () => {
    const tripId = 'tripId123';
    const mockTrip = { 
      _id: tripId, 
      status: 'canceled' 
    };

    findByIdAndUpdateStub.resolves(mockTrip);

    const req = {
      params: { id: tripId }
    };
    const res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };

    await cancelTrip(req, res);

    expect(findByIdAndUpdateStub.calledOnce).to.be.true;
    const [receivedId, updateData, options] = findByIdAndUpdateStub.firstCall.args;
    
    expect(receivedId).to.equal(tripId);
    expect(updateData).to.deep.equal({ status: 'canceled' });
    expect(options).to.deep.equal({ new: true });
  });
});


describe('bookTrip Functionality', () => {
  let createStub , consoleErrorStub;

  const mockUser = {
    _id: 'user123'
  };

  beforeEach(() => {
    createStub = sinon.stub(MyTrip, 'create');
    consoleErrorStub = sinon.stub(console, 'error');
  });

  afterEach(() => {
    createStub.restore();
    consoleErrorStub.restore();
  });

  it('Successfully book a trip', async () => {
    const tripId = 'trip456';
    const mockNewTrip = {
      user: mockUser._id,
      trip: tripId
    };

    createStub.resolves(mockNewTrip);

    const req = {
      params: { tripId },
      user: mockUser
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await bookTrip(req, res);

    expect(createStub.calledOnceWith({
      user: mockUser._id,
      trip: tripId
    })).to.be.true;

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledOnce).to.be.true;
    
    const responseData = res.json.firstCall.args[0];
    expect(responseData.message).to.equal('Trip Booked Successfully!!');
  });

  it('Handle trip booking error', async () => {
    const tripId = 'trip456';
    const errorMessage = 'Booking failed';

    createStub.rejects(new Error(errorMessage));

    const req = {
      params: { tripId },
      user: mockUser
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await bookTrip(req, res);

    expect(createStub.calledOnceWith({
      user: mockUser._id,
      trip: tripId
    })).to.be.true;

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledOnce).to.be.true;
    
    const responseData = res.json.firstCall.args[0];
    expect(responseData.message).to.equal('Failed to book trip');
    expect(responseData.error).to.equal(errorMessage);
  });

  it('Call create with correct trip and user details', async () => {
    const tripId = 'trip789';
    const mockNewTrip = {
      user: mockUser._id,
      trip: tripId
    };

    createStub.resolves(mockNewTrip);

    const req = {
      params: { tripId },
      user: mockUser
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await bookTrip(req, res);

    const createArgs = createStub.firstCall.args[0];
    expect(createArgs.user).to.equal(mockUser._id);
    expect(createArgs.trip).to.equal(tripId);
  });
});