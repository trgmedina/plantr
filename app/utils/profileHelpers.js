const axios = require("axios");

let profileHelpers = {
	getPlantInfo: function(plantId) {
		// to do
		let id = plantId;
		console.log("helper function triggered")
		return axios.get("/app/profile/"+id).then(function(results) {
			console.log(results.data)
			return results.data;
		});
	}
};

module.exports = profileHelpers;