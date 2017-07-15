// Include the Axios library for HTTP requests
var axios = require("axios");
var moment = require('moment');
require('moment-recur');


// Helper Functions
var reminderHelpers = {
  // This will return any reminders from our database
  getReminders: function() {
    return axios.get("/api/reminders")
      .then(function(results) {
        console.log("axios results", results);
        return results.data[0];
    });
  }

};


// We export the helpers function
module.exports = reminderHelpers;