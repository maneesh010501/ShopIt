const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../server.js') // replace with your app file name
const User = require('../models/userModel.js') // replace with your user model file name
const jwt = require('jsonwebtoken')

chai.use(chaiHttp)
const expect = chai.expect

describe('User operations /users', () => {

    var userId;

    // Create user
    it('should create a new user and return a token', async () => {
        const res = await chai.request(app)
        .post('/users')
        .send({
            name: 'AdminTest User',
            email: 'AdminTest@gmail.com',
            password: 'Password@123',
            Token: 'Admin1001'
        })
    
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('email', 'AdminTest@gmail.com')
        expect(res.body).to.have.property('token')
        // checking if token is valid or not
        const decodedToken = jwt.verify(res.body.token, "sunflowerblue")
        expect(decodedToken).to.have.property('_id')
        userId = decodedToken._id
        // Checking if user is created in database or not
        const user = await User.findById(decodedToken._id)
        expect(user).to.have.property('name', 'AdminTest User')
        expect(user).to.have.property('email', 'AdminTest@gmail.com')
        // add more assertions as needed
    })

    it('should return an error if any required fields are missing', async () => {
        const res = await chai.request(app)
        .post('/users')
        .send({
            name: 'Test User',
            password: 'Password@123',
            Token: 'test_token'
        })

        expect(res).to.have.status(400)
        expect(res.body).to.have.property('error')
        // add more assertions as needed
    })

    // Login user
    it('should log in a user and return a token', async () => {
        const res = await chai.request(app)
          .post('/login')
          .send({
            email: 'AdminTest@gmail.com',
            password: 'Password@123',
          })
    
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('email', 'AdminTest@gmail.com')
        expect(res.body).to.have.property('token')
        const decodedToken = jwt.verify(res.body.token, "sunflowerblue")
        expect(decodedToken).to.have.property('_id')
        expect(res.body).to.have.property('AdminToken')
        expect(res.body.user).to.have.property('name', 'AdminTest User')
        expect(res.body.user).to.have.property('email', 'AdminTest@gmail.com')
        // add more assertions as needed
    })
    
    it('should return an error if the email or password is incorrect', async () => {
        const res = await chai.request(app)
            .post('/login')
            .send({
            email: 'AdminTest@gmail.com',
            password: 'wrong_password'
            })

        expect(res).to.have.status(400)
        expect(res.body).to.have.property('error')
        // add more assertions as needed
    })
    
    // Update user
    it('should update a user', async () => {
    
        const res = await chai.request(app)
          .put(`/users/${userId}`)
          .send({
            name: 'Admin User',
            email: 'AdminTest@gmail.com',
            password: 'Password@123',
            Token: 'Admin1001'
          });
    
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('User updated successfully');
        expect(res.body.user).to.have.property('name', 'Admin User');
    });
    
    it('should return an error if the user is not found', async () => {
        const res = await chai.request(app)
          .put('/users/invalidid')
          .send({
            name: 'Admin User',
            email: 'AdminTest@gmail.com',
            password: 'Password@123',
            Token: 'Admin1001'
          });
    
        expect(res).to.have.status(500);
        expect(res.body.message).to.equal('Server error');
    });

    // Get user
    it('should return all users', () => {
        chai.request(app)
          .get('/users')
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
          });
    });

    after(async () => {
        // delete the test user from the database here if needed
        await User.deleteOne({ email: 'AdminTest@gmail.com' })
    })
})


