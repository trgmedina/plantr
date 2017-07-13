var moment = require('moment');
require('moment-recur');

// $( document ).ready(function() {
	// global variables
	var recurrence;

	//array of test alert objects
	var testAlerts = [
		{
			createdAt: "6-7-2017",
			type: "fertilizer",
			days: [
				"Wednesday"
				],

			frequency: 3
		},
		{
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
			createdAt: "7-01-2017",
			type: "prune",
			days: [
				"Saturday", 
				"Wednesday"
				],

			frequency: 1
		},
	]

	// grab today's date
	var todaysDate = moment().format()

	// call the setReminder function for each item in testAlerts array and pass object data to function
	for (var i = 0; i<testAlerts.length; i++) {
		setReminder(testAlerts[i].createdAt, testAlerts[i].days, testAlerts[i].frequency)
	}

	// function to grab reminder dates based on user settings
	// currently only weekly, biweekly and monthly frequencies are working
	function setReminder(createdDate, days, frequency) {
		// format the alert created date for moment
		var startDate = moment(createdDate,"MM-DD-YYYY");
		// find the day of the week for that date
		var day = moment(createdDate,"MM-DD-YYYY").format("ddd");
		// and what week in the month it occurs (1-4)
		var week = moment(startDate).monthWeek()
		console.log("----Start Date Information-----")
		console.log("Date: ", startDate)
		console.log("Day: ", day)
		console.log("Week: ", week)
		console.log("===============================")

		// this test works
		if (frequency===0) {
			// using alert created date, set the weekly recurrence based on selected days 
			recurrence = startDate.recur().every(days).daysOfWeek();
			// grab dates starting from current date
			recurrence.fromDate(todaysDate);
			// generate next three dates in recurrence
			nextDates = recurrence.next(3, "L")
			// call logger function to display the recurrence dates
			logger(days, frequency, nextDates)
		// this test works
		}else if (frequency===1){
			// setting variable for which weeks the alerts should occur
			var weeks;
			// if the alert created at date falls in week 1 or 3, set the frequency for same weeks
			if (week === 1 || 3) {
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
	        // call logger function to display the recurrence dates
			logger(days, frequency, nextDates)
	    //  test for every third week - not working
		// }else if (frequency===2) {
		// 	var weeks;
		// 	if (week === 1 || 4) {
		// 		weeks = [1,4]
		// 	}else {
		// 		weeks = [2,4]
		// 	}
		// 	cal = startDate.recur().every(days).daysOfWeek()
	 //                    .every([1, 4]).weeksOfMonthByDay()
	 //        nextDates = cal.next(3, "L")
	 //        console.log("-----Reminder Information-----")
		// 	console.log("Days of the Week: ", days)
		// 	console.log("Frequency: ", frequency)
		// 	console.log("Next Reminder Dates: ", nextDates)

		// this test works!
		}else {
			// setting a cal recurrence based on days of week at monthly frequency
			cal = startDate.recur().every(days).daysOfWeek()
	                    .every(week).weekOfMonth()
	        // grab dates starting from current date
	        cal.fromDate(todaysDate);
	        // generate next three dates in recurrence
	        nextDates = cal.next(3, "L")
			// call logger function to display the recurrence dates
			logger(days, frequency, nextDates)
		}
	}

	function logger (days, frequency, dates) {
		console.log("-----Reminder Information-----")
		console.log("Days of the Week: ", days)
		console.log("Frequency: ", frequency)
		console.log("Reminder Dates: ", dates)
		console.log("===============================")
	}

	// function displayAlerts {

	// }
// });