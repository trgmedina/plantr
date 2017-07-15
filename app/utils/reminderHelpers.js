// Include the Axios library for HTTP requests
var axios = require("axios");
// var moment = require('moment');
// require('moment-recur');


// Helper Functions
var reminderHelpers = {
  // This will return any reminders from our database
  getReminders: function() {
    return axios.get("/api/reminders")
      .then(function(results) {
        console.log("axios results data 0", results.data[0].reminders[0]);
        return results.data[0].reminders;
    });
  }

};


// We export the helpers function
module.exports = reminderHelpers;