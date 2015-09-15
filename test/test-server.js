process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");

var server = require('../server/app');
var Exercise = require("../server/models/exercise");

var should = chai.should();
chai.use(chaiHttp);

describe('Exercises', function() {

  Exercise.collection.drop();

  beforeEach(function(done){
    var newExercise = new Exercise({
      name: 'Game Library',
      description: 'OOP practice',
      tags: ['javaScript']
    });
    newExercise.save(function(err) {
      done();
    });
  });
  afterEach(function(done){
    Exercise.collection.drop();
    done();
  });

  it('should list ALL exercises on /exercises GET', function(done) {
  chai.request(server)
    .get('/api/v1/exercises')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body[0].should.have.property('_id');
      res.body[0].should.have.property('name');
      res.body[0].should.have.property('description');
      res.body[0].name.should.equal('Game Library');
      res.body[0].description.should.equal('OOP practice');
      res.body[0].tags[0].should.equal('javaScript');
      done();
    });
  });
  it('should list a SINGLE exercise on /exercise/<id> GET', function(done) {
    var newExercise = new Exercise({
      name: 'Iterations',
      description: 'jQuery practice',
      tags: ['jQuery']
    });
    newExercise.save(function(err, data) {
      chai.request(server)
        .get('/api/v1/exercise/'+data.id)
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('name');
          res.body.should.have.property('description');
          res.body.should.have.property('tags');
          res.body.name.should.equal('Iterations');
          res.body.description.should.equal('jQuery practice');
          res.body.tags[0].should.equal('jQuery');
          res.body._id.should.equal(data.id);
          done();
        });
    });
  });

  it('should add a SINGLE exercise on /exercise POST', function(done) {
  chai.request(server)
    .post('/api/v1/exercises')
    .send({'name': 'Functions', 'description': 'javaScript', 'tags' : ['vanillaJS']})
    .end(function(err, res){
      console.log(res.body);
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('SUCCESS');
      res.body.SUCCESS.should.be.a('object');
      res.body.SUCCESS.should.have.property('name');
      res.body.SUCCESS.should.have.property('description');
      res.body.SUCCESS.should.have.property('tags');
      res.body.SUCCESS.should.have.property('_id');
      res.body.SUCCESS.name.should.equal('Functions');
      res.body.SUCCESS.description.should.equal('javaScript');
      res.body.SUCCESS.tags[0].should.equal('vanillaJS');
      done();
    });
  });
  // it('should update a SINGLE exercise on /exercise/<id> PUT');
  // it('should delete a SINGLE exercise on /exercise/<id> DELETE');
});
