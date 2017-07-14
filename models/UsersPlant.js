// Include the Mongoose Dependencies
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// Create a Schema for adding plants. 
var UsersPlantSchema = new Schema({
  name: {
    type: String,
    required: true
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
  height: {
  	type: String
  },
  specialCare: {
  	type: String
  },
  imageURL: {
  	type: String
  }
});

// Create the Model
var UsersPlant = mongoose.model("UsersPlant", UsersPlantSchema);

// Export it for use elsewhere
module.exports = UsersPlant;
