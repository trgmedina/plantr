// Include the Mongoose Dependencies
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// Create a Schema for adding plants. 
var UserPlants = new Schema({
  name: {
    type: String,
    required: true
  },
  nickname: {
    type: String
  },
  description: {
  	type: String
  },
  origin: {
  	type: String
  },
  sunlightAmt: {
  	type: String,
  	required: true
  },
  waterSchedule: {
  	type: String,
  	required: true
  },
  imageURL: {
  	type: String
  }
});

// Create the Model
var UserPlants = mongoose.model("UserPlants", UserPlantsSchema);

// Export it for use elsewhere
module.exports = UserPlants;
