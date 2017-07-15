var moment = require('moment');
require('moment-recur');

	// global variables
	var recurrence;

	//array of test reminder objects - what we would return from DB query
	var testReminders = [
		{
			plant: "cactus",
			createdAt: "6-7-2017",
			type: "water",
			days: [
				"Friday"
				],

			frequency: 3
		},
		{
			plant: "tulip",
			createdAt: "4-24-2017",
			type: "water",
			days: [
				"Tuesday", 
				"Friday",
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

	var displayReminders = [];
	var sortedDisplayReminders = [];

	// grab today's date
	var todaysDate = moment().format()

	function createReminderArray() {
		// loop through results from DB and call the setReminder funtion to generate dates
		for (var i = 0; i<testReminders.length; i++) {
			var newReminder = {
					plant: testReminders[i].plant,
					type: testReminders[i].type,
					dates: []
				}

			displayReminders.push(newReminder);
			
			setReminder(testReminders[i].createdAt, testReminders[i].days, testReminders[i].frequency, i);
		}

		// console.log(displayReminders)
		createSortedReminderArrays();
	}

	createReminderArray()
	// function to grab reminder dates based on user settings
	// currently only weekly, biweekly and monthly frequencies are working
	function setReminder(createdDate, days, frequency, index) {
		// format the reminder created date for moment
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
			// using reminder created date, set the weekly recurrence based on selected days 
			recurrence = startDate.recur().every(days).daysOfWeek();
			// grab dates starting from current date
			recurrence.fromDate(todaysDate);
			// generate next three dates in recurrence
			nextDates = recurrence.next(3, "L")
			// loop through resulting array and push to the reminder object
			for (var i = 0; i < nextDates.length; i++) {
				displayReminders[index].dates.push(nextDates[i])
			}
			// dev function logs the generated recurrence dates
			// logger(days, frequency, nextDates)

		// this test works
		}else if (frequency===1){
			// setting variable for which weeks the reminders should occur
			var weeks;
			// if the reminder created at date falls in week 0, 1 or 3, set the frequency for same weeks
			if (week === 0 || 2 ) {
				weeks = [0,2]
			// else, set the frequency for weeks 2 & 4
			}else {
				weeks = [1,3]
			}
			// setting a cal recurrence based on days of week and weeks variable determined above
			cal = startDate.recur().every(days).daysOfWeek()
	                    .every(weeks).weeksOfMonthByDay()
	        // grab dates starting from current date
	        cal.fromDate(todaysDate);
	        // generate next three dates in recurrence
	        nextDates = cal.next(3, "L")
	        // loop through resulting array and push to the reminder object
			for (var i = 0; i < nextDates.length; i++) {
				displayReminders[index].dates.push(nextDates[i])
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
	        // loop through resulting array and push to the reminder object
			for (var i = 0; i < nextDates.length; i++) {
				displayReminders[index].dates.push(nextDates[i])
			}
			// call logger function to display the recurrence dates
			// logger(days, frequency, nextDates)
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

	function createSortedReminderArrays() {
		for (var i = 0; i<displayReminders.length; i++) {
			
			for (var j = 0; j<displayReminders[i].dates.length; j++) {
				var date = displayReminders[i].dates[j]
				var newObject = {
					plant: displayReminders[i].plant,
					type: displayReminders[i].type,
					date: date
				}
				sortedDisplayReminders.push(newObject);
			}
		}
		
		sortedDisplayReminders.sort(function(a,b) { 
    		return new Date(a.date).getTime() - new Date(b.date).getTime() 
		});
		
		for (var i = 0; i<sortedDisplayReminders.length; i++) {
			if(sortedDisplayReminders[i].date.getTime()===todaysDate.getTime()) {
				displayTodaysReminders(sortedDisplayReminders[i]);
			}

			// else if (sortedDisplayReminders[i]<(moment(todaysDate).day(7)) {
			// 	// displayUpcomingReminders(sortedDisplayReminders[i]);
			// }
		}
	}

	function displayTodaysReminders(reminders){
		for (var i = 0; i<reminders.length; i++) {
			var wrapper = $('<div class="panel panel-default">')
			var image = $('<span><img class="img-rounded reminder-img">').src('lala')
			var plant = $('<p>').text(reminders[i].plant)
			var icon = $('<i className="fa fa-tint" aria-hidden="true">')
			// var reminderText = $('<p>').text('Reminder to '+ reminders[i].type + ' on ' + moment(reminders[i]).format('dddd') + ", " + reminders[i]).date);

			var body = $('<div class="panel-body"><span>').image.append(plant);
			var footer = $('<div class="panel-footer"><span>').append(icon).append(reminderText)
			var $newReminder = wrapper.append(body).append(footer);

			$('#current-reminders').append($newReminder);

		};
	}

	function displayUpcomingReminders(reminders){

	}

