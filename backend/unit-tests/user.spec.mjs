import * as chai from 'chai';
import * as sinon from 'sinon';
import { userSignIn } from '../controllers/user.js'
import User from '../models/user.js'

const expect = chai.expect;

describe('Test Suite for User Controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                email: 'test@example.com',
                password: 'password123'
            }
        };
        
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
            cookie: sinon.stub()
        };
    });

    afterEach(() => {
        sinon.restore();
    });

    it('Successful sign in with valid credentials', async () => {
        const mockToken = 'fake-jwt-token';
        const matchPasswordStub = sinon.stub(User, 'matchPasswordAndGenerateToken')
            .resolves(mockToken);

        await userSignIn(req, res);

        expect(matchPasswordStub.calledOnce).to.be.true;
        expect(matchPasswordStub.calledWith(req.body.email, req.body.password)).to.be.true;
        expect(res.cookie.calledWith('token', mockToken, {
            domain: 'localhost',
            maxAge: 24 * 60 * 60 * 1000
        })).to.be.true;
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith({
            success: true,
            message: "User Signed In Successfully"
        })).to.be.true;

        matchPasswordStub.restore();
    });

    it('Prompting the error message for invalid credentials', async () => {
        const errorMessage = 'Invalid credentials';
        const matchPasswordStub = sinon.stub(User, 'matchPasswordAndGenerateToken')
            .rejects(new Error(errorMessage));

        await userSignIn(req, res);

        expect(matchPasswordStub.calledOnce).to.be.true;
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith({
            success: false,
            message: errorMessage
        })).to.be.true;

        matchPasswordStub.restore();
    });

    it('Handling blank email ID', async () => {
        req.body = { password: 'password123' };
        await userSignIn(req, res);

        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith({
            success: false,
            message: sinon.match.string
        })).to.be.true;
    });

    it('Handling blank password', async () => {
        req.body = { email: 'test@example.com' };
        await userSignIn(req, res);

        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith({
            success: false,
            message: sinon.match.string
        })).to.be.true;
    })

    it('Handling server errors', async () => {
        const serverError = new Error('Database connection failed');
        const matchPasswordStub = sinon.stub(User, 'matchPasswordAndGenerateToken')
            .rejects(serverError);

        // Call the signin function
        await userSignIn(req, res);

        // Verify the response
        expect(matchPasswordStub.calledOnce).to.be.true;
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith({
            success: false,
            message: serverError.message
        })).to.be.true;
    });
});