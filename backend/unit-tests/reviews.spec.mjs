import * as chai from 'chai';
import * as sinon from 'sinon';
import Trip from '../models/trip.js';
import User from '../models/user.js';
import Review from '../models/review.js';
import { addReview , getAllReviewByTripId, deleteReviewById } from '../controllers/reviews.js';

const { expect } = chai;

describe('Test-cases for addReview Functionality', () => {
  let findTripByIdStub , findUserByIdStub , reviewSaveStub;

  const mockTripId = 'trip123';
  const mockUserId = 'user456';
  const mockRating = 4;
  const mockComment = 'Great trip!';

  beforeEach(() => {
    findTripByIdStub = sinon.stub(Trip, 'findById');
    findUserByIdStub = sinon.stub(User, 'findById');
    reviewSaveStub = sinon.stub(Review.prototype, 'save');
  });

  afterEach(() => {
    findTripByIdStub.restore();
    findUserByIdStub.restore();
    reviewSaveStub.restore();
  });

  it('Successfully add a review', async () => {
    const mockTrip = { _id: mockTripId };
    const mockUser = { _id: mockUserId };

    findTripByIdStub.resolves(mockTrip);
    findUserByIdStub.resolves(mockUser);
    reviewSaveStub.resolves();

    const req = {
      params: { tripId: mockTripId },
      body: { 
        userId: mockUserId, 
        rating: mockRating, 
        comment: mockComment 
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await addReview(req, res);

    expect(findTripByIdStub.calledOnceWith(mockTripId)).to.be.true;
    expect(findUserByIdStub.calledOnceWith(mockUserId)).to.be.true;
    expect(reviewSaveStub.calledOnce).to.be.true;

    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledOnce).to.be.true;
    
    const responseData = res.json.firstCall.args[0];
    expect(responseData.message).to.equal('Review created successfully');
    expect(responseData.review).to.be.an('object');
  });

  it('Return 404 if trip is not found', async () => {
    findTripByIdStub.resolves(null);

    const req = {
      params: { tripId: mockTripId },
      body: { 
        userId: mockUserId, 
        rating: mockRating, 
        comment: mockComment 
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await addReview(req, res);

    expect(findTripByIdStub.calledOnceWith(mockTripId)).to.be.true;
    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledOnce).to.be.true;
    
    const responseData = res.json.firstCall.args[0];
    expect(responseData.message).to.equal('Trip not found');
  });

  it('Return 404 if user is not found', async () => {
    const mockTrip = { _id: mockTripId };

    findTripByIdStub.resolves(mockTrip);
    findUserByIdStub.resolves(null);

    const req = {
      params: { tripId: mockTripId },
      body: { 
        userId: mockUserId, 
        rating: mockRating, 
        comment: mockComment 
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await addReview(req, res);

    expect(findTripByIdStub.calledOnceWith(mockTripId)).to.be.true;
    expect(findUserByIdStub.calledOnceWith(mockUserId)).to.be.true;
    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledOnce).to.be.true;
    
    const responseData = res.json.firstCall.args[0];
    expect(responseData.message).to.equal('User not found');
  });

  it('Handle database errors', async () => {
    const errorMessage = 'Database connection error';
    findTripByIdStub.rejects(new Error(errorMessage));

    const req = {
      params: { tripId: mockTripId },
      body: { 
        userId: mockUserId, 
        rating: mockRating, 
        comment: mockComment 
      }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await addReview(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledOnce).to.be.true;
    
    const responseData = res.json.firstCall.args[0];
    expect(responseData.message).to.equal(errorMessage);
  });
});


describe('Test-cases for getAllReviewByTripId Functionality', () => {
    let findStub;
  
    const mockTripId = 'trip123';
  
    beforeEach(() => {
      findStub = sinon.stub(Review, 'find');
    });
  
    afterEach(() => {
      findStub.restore();
    });
  
    it('Successfully retrieve reviews for a specific trip', async () => {
      const mockReviews = [
        { 
          _id: 'review1', 
          trip: mockTripId, 
          rating: 4, 
          comment: 'Great trip' 
        },
        { 
          _id: 'review2', 
          trip: mockTripId, 
          rating: 5, 
          comment: 'Amazing experience' 
        }
      ];
  
      const populateStub = sinon.stub().resolves(mockReviews);
      findStub.returns({ populate: populateStub });
  
      const req = {
        params: { tripId: mockTripId }
      };
      const res = {
        json: sinon.spy()
      };
  
      await getAllReviewByTripId(req, res);
  
      expect(findStub.calledOnceWith({ trip: mockTripId })).to.be.true;
      expect(populateStub.calledOnceWith('user', 'name email')).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      
      const responseData = res.json.firstCall.args[0];
      expect(responseData).to.deep.equal(mockReviews);
    });
  
    it('Return empty array if no reviews exist for trip', async () => {
      const populateStub = sinon.stub().resolves([]);
      findStub.returns({ populate: populateStub });
  
      const req = {
        params: { tripId: mockTripId }
      };
      const res = {
        json: sinon.spy()
      };
  
      await getAllReviewByTripId(req, res);
  
      expect(findStub.calledOnceWith({ trip: mockTripId })).to.be.true;
      expect(populateStub.calledOnceWith('user', 'name email')).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      
      const responseData = res.json.firstCall.args[0];
      expect(responseData).to.be.an('array').that.is.empty;
    });
  
    it('Handle database errors', async () => {
      const errorMessage = 'Database connection error';
      const populateStub = sinon.stub().rejects(new Error(errorMessage));
      findStub.returns({ populate: populateStub });
  
      const req = {
        params: { tripId: mockTripId }
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };
  
      await getAllReviewByTripId(req, res);
  
      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      
      const responseData = res.json.firstCall.args[0];
      expect(responseData.message).to.equal(errorMessage);
    });
  });


  describe('Test-cases for deleteReviewById Functionality', () => {
    let findByIdAndDeleteStub;
  
    const mockReviewId = 'review123';
  
    beforeEach(() => {
      findByIdAndDeleteStub = sinon.stub(Review, 'findByIdAndDelete');
    });
  
    afterEach(() => {
      findByIdAndDeleteStub.restore();
    });
  
    it('Successfully delete a review', async () => {
      const mockReview = { 
        _id: mockReviewId, 
        trip: 'trip123', 
        user: 'user456' 
      };
  
      findByIdAndDeleteStub.resolves(mockReview);
  
      const req = {
        params: { reviewId: mockReviewId }
      };
      const res = {
        json: sinon.spy()
      };
  
      await deleteReviewById(req, res);
  
      expect(findByIdAndDeleteStub.calledOnceWith(mockReviewId)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      
      const responseData = res.json.firstCall.args[0];
      expect(responseData.message).to.equal('Review deleted successfully');
    });
  
    it('Return 404 error, if review is not found', async () => {
      findByIdAndDeleteStub.resolves(null);
  
      const req = {
        params: { reviewId: mockReviewId }
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };
  
      await deleteReviewById(req, res);
  
      expect(findByIdAndDeleteStub.calledOnceWith(mockReviewId)).to.be.true;
      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      
      const responseData = res.json.firstCall.args[0];
      expect(responseData.message).to.equal('Review not found');
    });
  
    it('Handle database errors', async () => {
      const errorMessage = 'Database connection error';
      findByIdAndDeleteStub.rejects(new Error(errorMessage));
  
      const req = {
        params: { reviewId: mockReviewId }
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };
  
      await deleteReviewById(req, res);
  
      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      
      const responseData = res.json.firstCall.args[0];
      expect(responseData.message).to.equal(errorMessage);
    });
  });