var mongoose = require('mongoose');
var Exercise = require('./server/models/exercise.js')

var exerciseSeed = [
  {
    name: 'Functions',
    description: 'Practice creating javaScript functions',
    tags: ['javaScript']
  },
  {
    name: 'Game Library',
    description: 'Object oriented programming',
    tags: ['OOP']
  },
  {
    name: 'Tip Calculator',
    description: 'Practice manipulating the DOM',
    tags: ['jQuery']
  }
];

function databaseSeed() {

  Exercise.find({}, function(err, documents){
    if(!err && documents.length===0) {

      for (var i = 0; i < exerciseSeed.length; i++) {
        var newExercise = new Exercise(exerciseSeed[i]);
        newExercise.save(function(err, success){
          if(!err) {
            console.log(
              'database seeded object!'
            );
          }
        })
      }
    }
  });

}

module.exports = databaseSeed;
