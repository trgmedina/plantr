// Here we will utilize the axios library to perform GET/POST requests
var axios = require("axios");

// Exporting an object with methods for retrieving and posting data to our API
module.exports = {

  getPlants: function() {
    return axios.get("/api");
  },

  // Takes in an argument for what to post to the database
  savePlant: function(plantData) {
    return axios.post("/api", plantData);
  }
};
