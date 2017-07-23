const axios = require("axios");

let profileHelpers = {
	getPlantInfo: function(plantId) {
		// to do
		let id = plantId;
		console.log("helper function triggered")
		return axios.get("/app/profile/"+id).then(function(results) {

			let plantData = {
				name: results.data.name,
				nickname: results.data.nickname,
				imageURL: results.data.imageURL,
				origin: results.data.origin,
				description: results.data.description,
				sunlightAmt: results.data.sunlightAmt,
				waterSchedule: results.data.waterSchedule,
				specialCare: results.data.specialCare
			}

			let reminderData = [];

			for (let i = 0; i< results.data.reminders.length; i++) {
				let res = results.data.reminders[i]
				let reminder = {
					plantId: results.data._id,
					type: res.reminderType,
					frequency: res.frequency,
					days: res.days.join(', '),
					created: res.created,
					id: res._id
				}

				reminderData.push(reminder)
			}
			
			return [plantData, reminderData];
		});
	},

	deleteSaved: function(reminderId) {
		let id = reminderId;
	    return axios.delete("/app/delete/"+id)
	    .then(function(results) {
	      console.log("axios results", results);
	      return results;
	    });
  	},

  	saveReminder: function(reminder, plantId) {

  		let newReminder = {
        	reminder: reminder,
        }

  		let route1 = "/app/new/"
  		let route = route1.concat(plantId)

  		return axios.post(route, reminder)
  	}
};

module.exports = profileHelpers;