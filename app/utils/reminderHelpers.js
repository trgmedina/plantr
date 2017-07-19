// Include the Axios library for HTTP requests
const axios = require("axios");
const moment = require('moment');
require('moment-recur');

let displayReminders = [];
let sortedDisplayReminders = [];
let todaysDate = moment().format("MM-DD-YYYY")
let endDate = moment().add(6, 'days').format("MM-DD-YYYY")
let recurrence;

let reminderHelpers = {
	getReminders: function() {
		displayReminders = [];
		sortedDisplayReminders = [];
	    return axios.get("/app/reminders").then(function(results) {
	        // console.log(" 1. axios results", results.data);

	        let data = results.data;

	        let displayRemindersIndex = -1;
			// loop through results from DB and call the setReminder funtion to generate dates
			for (let i = 0; i<data.length; i++) {
				for (let j = 0; j<data[i].reminders.length; j++) {
					let newReminder = {
							plant: data[i].name,
							type: data[i].reminders[j].reminderType,
							dates: [],
							imageURL: data[i].imageURL
						}
					displayRemindersIndex++;

					// console.log("new reminder", displayRemindersIndex, newReminder)

					displayReminders.push(newReminder);

					setReminder(data[i].reminders[j].created, data[i].reminders[j].days, data[i].reminders[j].frequency, displayRemindersIndex);

				}
			}
			// console.log("2. display reminders", displayReminders)
			
			for (let i = 0; i<displayReminders.length; i++) {
				
				for (let j = 0; j<displayReminders[i].dates.length; j++) {
					let date = displayReminders[i].dates[j]
					let newObject = {
						plant: displayReminders[i].plant,
						type: displayReminders[i].type,
						day: moment(date,"MM-DD-YYYY").format("dddd"),
						date: moment(date,"MM-DD-YYYY").format("MM/DD"),
						imageURL: displayReminders[i].imageURL
					}
					// console.log(j, newObject)
					sortedDisplayReminders.push(newObject);
				}
			}
			
			sortedDisplayReminders.sort(function(a,b) { 
	    		return new Date(a.date).getTime() - new Date(b.date).getTime() 
			});
			// console.log("3. sorted display reminders ", sortedDisplayReminders)
			return sortedDisplayReminders
		});
	}
};

// function to grab reminder dates based on user settings
// currently only weekly, biweekly and monthly frequencies are working
function setReminder(createdDate, days, frequency, index) {

	// find the day of the week for that date
	let day = moment(createdDate,"MM-DD-YYYY").format("ddd");
	let allDates;
	// and what week in the month it occurs (1-4)
	let week = moment(createdDate).monthWeek()
	// console.log("----Reminder Information-----")
	// console.log("Created Date: ", createdDate)
	// console.log("Start Date: ", todaysDate)
	// console.log("End Date: ", endDate)
	// console.log("Day: ", day)
	// console.log("Week: ", week)
	// console.log("===============================")

		// this test works
		if (frequency==="Every week") {
			// using reminder created date, set the weekly recurrence based on selected days 
			recurrence = moment(createdDate).recur(todaysDate, endDate).every(days).daysOfWeek();

			// generate dates
			allDates = recurrence.all("L");
			// loop through resulting array and push to the reminder object
			for (let i = 0; i < allDates.length; i++) {
				displayReminders[index].dates.push(allDates[i])
			}
			// dev function logs the generated recurrence dates
			// logger(days, frequency, allDates)

		// this test works
		}else if (frequency==="Every other week"){
			// setting variable for which weeks the reminders should occur
			let weeks;
			var cal;
			let nextDates;
			// if the reminder created at date falls in week 0, 1 or 3, set the frequency for same weeks
			if (week === 0 || 2 ) {
				weeks = [0,2]
			// else, set the frequency for weeks 2 & 4
			}else {
				weeks = [1,3]
			}
			console.log("days",days)
			// setting a cal recurrence based on days of week and weeks variable determined above
			cal = moment(createdDate).recur(todaysDate, endDate).every(days).daysOfWeek()
	                    .every(weeks).weeksOfMonthByDay()
	        // generate dates
	        allDates = cal.all("L");
	        // loop through resulting array and push to the reminder object
			for (let i = 0; i < allDates.length; i++) {
				displayReminders[index].dates.push(allDates[i])
			}
	        // call logger function to display the recurrence dates
			// logger(days, frequency, allDates)

		// this test works!
		}else {
			// setting a cal recurrence based on days of week at monthly frequency
			cal = moment(createdDate).recur(todaysDate, endDate).every(days).daysOfWeek()
	                    .every(week).weekOfMonth()

	        // generate dates
	        allDates = cal.all("L");
	        // loop through resulting array and push to the reminder object
			for (let i = 0; i < allDates.length; i++) {
				displayReminders[index].dates.push(allDates[i])
			}
			// call logger function to display the recurrence dates
			// logger(days, frequency, allDates)
		}
}
	// function created for development purposes to test accuracy
	function logger (days, frequency, dates) {
		console.log("-----Reminder Information-----")
		console.log("Days of the Week: ", days)
		console.log("Frequency: ", frequency)
		console.log("Reminder Dates: ", dates)
		console.log("===============================")
	}

// We export the helpers function
module.exports = reminderHelpers;