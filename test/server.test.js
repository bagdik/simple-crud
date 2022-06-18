import chai from "chai";
import chaiHttp from "chai-http";

import server from '../src/server.js';

// Assertion style
chai.should();

chai.use(chaiHttp);

describe('Testing Simple-CRUD API', () => {
  /**
   * Test GET Route
  */
  describe('GET /api/users/', () => {
    it('It should GET all the users', (done) => {
      chai.request(server)
          .get('/api/users')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eq(3);
          done();
          }); 
    })

    it('It should NOT GET all the users', (done) => {
      chai.request(server)
          .get('/api/user')
          .end((err, res) => {
            res.should.have.status(404);
          done();
          }); 
    });
  });

  /**
   * Test GET (by id) Route
  */
  describe('GET /api/users/{userId}', () => {
    it('It should GET a user by valid id ', (done) => {
      const userId = '85c84fd7-0433-4475-81ca-f54c3ae7a1f4'; 
      chai.request(server)
          .get('/api/users/' + userId)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('name');
            res.body.should.have.property('age');
            res.body.should.have.property('hobbies');
            res.body.should.have.property('id').eq(userId);
          done();
        }); 
    });

    it('It should GET a user by invalid id ', (done) => {
      const userId = '13'; 
      chai.request(server)
          .get('/api/users/' + userId)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('message').eq('User ID is invalid (not uuid)');
          done();
        }); 
    });

    it('It should NOT GET a user by id ', (done) => {
      const userId = '20'; 
      chai.request(server)
        .get('/api/users/' + userId)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('message').eq('User does not exist');
        done();
      }); 
    });    
  });

  /**
   * Test POST Route
  */
   describe('POST /api/users', () => {
    it('It should POST a new user', (done) => {
      const user = {
        name: 'mark',
        age: 25,
        hobbies: ["fishing", "books reading"],
      } 
      chai.request(server)
          .post('/api/users')
          .send(user)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('name');
            res.body.should.have.property('age');
            res.body.should.have.property('hobbies');
            res.body.should.have.property('name').eq('mark');
            res.body.should.have.property('age').eq(25);
            res.body.should.have.property('hobbies').a('array');
          done();
        }); 

        it('It should NOT POST a new user without required property', (done) => {
          const user = {
            name: 'mark',
            hobbies: ["fishing", "books reading"],
          } 
          chai.request(server)
            .post('/api/users')
            .send(user)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.should.have.property('message').eq('Name, age, hobbies are required fields');
            done();
          }); 
        });
    });
   });
});