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
  // it('should list a SINGLE exercise on /exercise/<id> GET');
  // it('should add a SINGLE exercise on /exercise POST');
  // it('should update a SINGLE exercise on /exercise/<id> PUT');
  // it('should delete a SINGLE exercise on /exercise/<id> DELETE');
});
