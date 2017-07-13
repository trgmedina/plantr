var moment = require('moment');
require('moment-recur');



var week1 = moment("08/01/2017","MM-DD-YYYY").monthWeek()
var week2 = moment("08/08/2017","MM-DD-YYYY").monthWeek()
var week3 = moment("08/15/2017","MM-DD-YYYY").monthWeek()
var week4 = moment("08/22/2017","MM-DD-YYYY").monthWeek()
var week5 = moment("08/29/2017","MM-DD-YYYY").monthWeek()
console.log("Week: ", week1)
console.log("Week: ", week2)
console.log("Week: ", week3)
console.log("Week: ", week4)
console.log("Week: ", week5)

	// global variables
	var recurrence;

	//array of test alert objects - what we would return from DB query
	var testAlerts = [
		{
			plant: "cactus",
			createdAt: "6-7-2017",
			type: "water",
			days: [
				"Wednesday"
				],

			frequency: 3
		},
		{
			plant: "tulip",
			createdAt: "4-24-2017",
			type: "water",
			days: [
				"Tuesday", 
				"Thursday",
				"Saturday"
				],

			frequency: 0
		},
		{
			plant : "ivy",
			createdAt: "7-01-2017",
			type: "prune",
			days: [
				"Saturday", 
				"Wednesday"
				],

			frequency: 1
		},
	];

	var displayAlerts = [];
	var sortedDisplayAlerts = [];

	// grab today's date
	var todaysDate = moment().format()

	function createAlertArray() {
		// loop through results from DB and call the setReminder funtion to generate dates
		for (var i = 0; i<testAlerts.length; i++) {
			var newAlert = {
					plant: testAlerts[i].plant,
					type: testAlerts[i].type,
					dates: []
				}

			displayAlerts.push(newAlert);
			
			setReminder(testAlerts[i].createdAt, testAlerts[i].days, testAlerts[i].frequency, i);
		}

		// console.log(displayAlerts)
		createSortedAlertArray();
	}

	createAlertArray()
	// function to grab reminder dates based on user settings
	// currently only weekly, biweekly and monthly frequencies are working
	function setReminder(createdDate, days, frequency, index) {
		// format the alert created date for moment
		var startDate = moment(createdDate,"MM-DD-YYYY");
		// find the day of the week for that date
		var day = moment(createdDate,"MM-DD-YYYY").format("ddd");
		// and what week in the month it occurs (1-4)
		var week = moment(startDate).monthWeek()
		// console.log("----Start Date Information-----")
		// console.log("Date: ", startDate)
		// console.log("Day: ", day)
		// console.log("Week: ", week)
		// console.log("===============================")

		// this test works
		if (frequency===0) {
			// using alert created date, set the weekly recurrence based on selected days 
			recurrence = startDate.recur().every(days).daysOfWeek();
			// grab dates starting from current date
			recurrence.fromDate(todaysDate);
			// generate next three dates in recurrence
			nextDates = recurrence.next(3, "L")
			// loop through resulting array and push to the alert object
			for (var i = 0; i < nextDates.length; i++) {
				displayAlerts[index].dates.push(nextDates[i])
			}
			// dev function logs the generated recurrence dates
			// logger(days, frequency, nextDates)

		// this test works
		}else if (frequency===1){
			// setting variable for which weeks the alerts should occur
			var weeks;
			// if the alert created at date falls in week 0, 1 or 3, set the frequency for same weeks
			if (week === 0 || 1 || 3) {
				weeks = [1,3]
			// else, set the frequency for weeks 2 & 4
			}else {
				weeks = [2,4]
			}
			// setting a cal recurrence based on days of week and weeks variable determined above
			cal = startDate.recur().every(days).daysOfWeek()
	                    .every(weeks).weeksOfMonthByDay()
	        // grab dates starting from current date
	        cal.fromDate(todaysDate);
	        // generate next three dates in recurrence
	        nextDates = cal.next(3, "L")
	        // loop through resulting array and push to the alert object
			for (var i = 0; i < nextDates.length; i++) {
				displayAlerts[index].dates.push(nextDates[i])
			}
	        // call logger function to display the recurrence dates
			// logger(days, frequency, nextDates)

		// this test works!
		}else {
			// setting a cal recurrence based on days of week at monthly frequency
			cal = startDate.recur().every(days).daysOfWeek()
	                    .every(week).weekOfMonth()
	        // grab dates starting from current date
	        cal.fromDate(todaysDate);
	        // generate next three dates in recurrence
	        nextDates = cal.next(3, "L")
	        // loop through resulting array and push to the alert object
			for (var i = 0; i < nextDates.length; i++) {
				displayAlerts[index].dates.push(nextDates[i])
			}
			// call logger function to display the recurrence dates
			// logger(days, frequency, nextDates)
		}
	}
	// function created for development purposes to test accuracy
	// function logger (days, frequency, dates) {
	// 	console.log("-----Reminder Information-----")
	// 	console.log("Days of the Week: ", days)
	// 	console.log("Frequency: ", frequency)
	// 	console.log("Reminder Dates: ", dates)
	// 	console.log("===============================")
	// }

	function createSortedAlertArray() {
		for (var i = 0; i<displayAlerts.length; i++) {
			
			for (var j = 0; j<displayAlerts[i].dates.length; j++) {
				var date = displayAlerts[i].dates[j]
				var newObject = {
				plant: displayAlerts[i].plant,
				type: displayAlerts[i].type,
				date: date
				}
				sortedDisplayAlerts.push(newObject);
			}
			
		}
		sortedDisplayAlerts.sort(function(a,b) { 
    		return new Date(a.date).getTime() - new Date(b.date).getTime() 
		});
		console.log(sortedDisplayAlerts)
	}