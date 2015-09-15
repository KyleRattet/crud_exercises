var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Exercise = new Schema (
  {
    name: String,
    description: String,
    tags: [String]
});


module.exports = mongoose.model('exercises', Exercise);

mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/exercises")
