// Include the Mongoose Dependencies
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// Create a Schema for user info. 
var UserSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  username: {
  	type: String,
    required: true
  },
  password: {
  	type: String,
    required: true
  },
  //an array that holds the ObjectIds for plants; references the Plant model
  plants: [{
    type: Schema.Types.ObjectId,
    nickname: String,
    ref: "Plant"
  }]
});

// Create the Model
var User = mongoose.model("User", UserSchema);

// Export it for use elsewhere
module.exports = User;
