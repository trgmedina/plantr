var moment = require('moment');
require('moment-recur');

var recurrence;

var userObj = {
	days: [
		"Tuesday", 
		"Thursday"
		],

	frequency: 3
}

var date = "07-12-2017"
// recurrence = myDate.recur().every(["Monday", "Wednesday"]).daysOfWeek();

// nextDates = recurrence.next(7)

// console.log('nextDates',nextDates);

// moment("01/01/2014").monthWeek()

setReminder(date, userObj.days, userObj.frequency)


function setReminder(date, days, frequency) {
	myDate = moment(date,"MM-DD-YYYY");
	day = moment(date,"MM-DD-YYYY").format("ddd");
	week = moment(myDate).monthWeek()
	console.log("----Start Date Information-----")
	console.log("Date: ", myDate)
	console.log("Day: ", day)
	console.log("Week: ", week)
	console.log("===============================")
	// this test works
	if (frequency===0) {
		recurrence = myDate.recur().every(days).daysOfWeek();
		nextDates = recurrence.next(3, "L")
		console.log("-----Reminder Information-----")
		console.log("Days of the Week: ", days)
		console.log("Frequency: ", frequency)
		console.log("Next Reminder Dates: ", nextDates)
	// this test works!
	}else if (frequency===1){
		var weeks;
		if (week === 1 || 3) {
			weeks = [1,3]
		}else {
			weeks = [2,4]
		}
		cal = myDate.recur().every(days).daysOfWeek()
                    .every(weeks).weeksOfMonthByDay()
        nextDates = cal.next(4, "L")
		console.log("-----Reminder Information-----")
		console.log("Days of the Week: ", days)
		console.log("Frequency: ", frequency)
		console.log("Next Reminder Dates: ", nextDates)
    // sort of working, need to figure out every other week based on start date week
	}else if (frequency===2) {
		var weeks;
		if (week === 1 || 4) {
			weeks = [1,4]
		}else {
			weeks = [2,4]
		}
		cal = myDate.recur().every(days).daysOfWeek()
                    .every([1, 4]).weeksOfMonthByDay()
        nextDates = cal.next(3, "L")
        console.log("-----Reminder Information-----")
		console.log("Days of the Week: ", days)
		console.log("Frequency: ", frequency)
		console.log("Next Reminder Dates: ", nextDates)
	// this test works!
	}else {
		cal = myDate.recur().every(days).daysOfWeek()
                    .every(week).weekOfMonth()
        nextDates = cal.next(2, "L")
		console.log("-----Reminder Information-----")
		console.log("Days of the Week: ", days)
		console.log("Frequency: ", frequency)
		console.log("Next Reminder Dates: ", nextDates)
	}
}