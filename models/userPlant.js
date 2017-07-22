// Include the Mongoose Dependencies
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// Create a Schema for adding plants. 
var UserPlantSchema = new Schema({
  user: {
    type: Number, 
    ref: 'userSchema'
  },
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
  },
  specialCare: {
    type: String
  },
  rating: {
    type: Number
  },
  reminders: [{
      reminderType: { type: String, required: true },
      days: [{ type: String, required: true }],
      frequency: { type: String, required: true },
      created: { type: String }
  }]
});

// Create the Model
var UserPlant = mongoose.model("UserPlant", UserPlantSchema);

// Export it for use elsewhere
module.exports = UserPlant;
