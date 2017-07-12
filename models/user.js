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
  plant: {
    type: Schema.Types.ObjectId,
    ref: "Plant"
  }
});

// Create the Model
var User = mongoose.model("User", UserSchema);

// Export it for use elsewhere
module.exports = User;
