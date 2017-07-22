// Here we will utilize the axios library to perform GET/POST requests
const axios = require("axios");

// Exporting an object with methods for retrieving and posting data to our API
module.exports = {

  getPlants: function() {
    return axios.get("/api");
  },

  // Takes in an argument for what to post to the database
  savePlant: function(plantData) {
     return axios.get("/user/plants").then(function(results){
            console.log("user id is here",results.data._id);
            let id = results.data._id;
            let newPlant = {
                  plant: plantData,
                  userId: id
            }
<<<<<<< HEAD
            console.log("new plant ID: " + plantData.id);
            return axios.post("/user/plants/" + newPlant.id, newPlant);
=======
            return axios.post("/user/plants", newPlant);
>>>>>>> fbb392036edebd3edfe96114745b4f193c8b567e
     });
  },

  // Get the array of plants names in the plants collection and use it for autocomplete
  getPlantsNames: function() {
     return axios.get("/api").then(function(results){
     	 let plantsNames = [];
    	    for(let i=0; i < results.data.length; i++){
    	    	plantsNames.push(results.data[i].name);
    	    }
    	   // console.log(plantsNames); 
    	   return plantsNames;
       });
  },

  getUserPlants: function() {
    let displayUserPlants = [];

    return axios.get("/user/plants").then(function(results){
      let data = results.data;

      // loop through results from DB 
      for (let i = 0; i < data.length; i++) {
          let plantData = {
            id: data[i]._id,
            name: data[i].name,
            nickname: data[i].nickname,
            description: data[i].description,
            origin: data[i].origin,
            sunlightAmt: data[i].sunlightAmt,
            waterSchedule: data[i].waterSchedule,
            imageURL: data[i].imageURL,
            specialCare: data[i].specialCare,
            reminders: {
              reminderType: data[i].reminders.reminderType,
              days: data[i].reminders.days,
              frequency: data[i].reminders.frequency
            }
          }

          displayUserPlants.push(plantData);
      }

      return displayUserPlants;
    });
  },

  deleteUserPlant: function(plant) {
<<<<<<< HEAD
    console.log("helpers", plant);

    return axios.delete("/user/plants/", {
      params: {
=======
    console.log("helpers", plant.id);

    return axios.delete("/user/plants/" +plant.id, {
      data: {
>>>>>>> fbb392036edebd3edfe96114745b4f193c8b567e
        id: plant.id,
        name: plant.name,
        nickname: plant.nickname,
        description: plant.description,
        origin: plant.origin,
        sunlightAmt: plant.sunlightAmt,
        waterSchedule: plant.waterSchedule,
        imageURL: plant.imageURL,
        specialCare: plant.specialCare,
        reminders: plant.reminders
      }
    }).then(function(results) {
      console.log("axios results", results);
      return results;
    });
  },

  searchPlant: function(plantName){
    //find the plant being passed from addPlant search input
    let searchPlant = plantName;
      return axios.get("/api").then(function(results){
         for(let j=0; j < results.data.length; j++){
          if (results.data[j].name === searchPlant){
             return results.data[j]; 
             break; 
            }
          }     
      }); 
  }

};



