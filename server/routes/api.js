var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Exercise = require('../models/exercise.js')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

//ROUTES

//ROUTE 1 GET(ALL EXERCISES) /api/v1/exercises
router.get('/exercises', function(req, res, next) {
  Exercise.find(function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});


//ROUTE 2 GET(a single exercise) /api/v1/exercise/:id
router.get('/exercise/:id', function(req, res, next) {
  Exercise.findById(req.params.id, function (err, data){
     if (err) {
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});

//ROUTE 3  POST /api/v1/exercises
router.post('/exercises', function(req, res, next) {
  newExercise = new Exercise({
    name: req.body.name,
    description: req.body.description,
    tags: req.body.tags
  });
  console.log(newExercise);
  newExercise.save(function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json({"SUCCESS": data});
    }
  });
});

//ROUTE 4  PUT /api/v1/exercise/:id
router.put('/exercise/:id', function(req, res, next) {
  var update = {
    name: req.body.name,
    description: req.body.description,
    tags: req.body.tags
  };
  var options = {new: true};
  Exercise.findByIdAndUpdate(req.params.id, update, options, function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json({'UPDATED' : data});
    }
  });
});


//ROUTE 5 DELETE /api/v1/exercise/:id
router.delete('/exercise/:id', function (req, res, next) {
  Exercise.findByIdAndRemove(req.params.id, function (err, data) {
    if (err) {
      res.json ({'message': err});
    } else {
      res.json({'REMOVED' :data});
    }
  });
});

