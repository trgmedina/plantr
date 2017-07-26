// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var fs = require("fs");
var ICS = require('ics');

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Require Plant, User, and User's Plants schemas
var Plant = require("./models/plant");
var User = require("./models/user");
var UserPlant = require("./models/userPlant")

var flash = require('connect-flash');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');

// Create a new express app
var app = express();
// Sets an initial port
var PORT = process.env.PORT || 3000;

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// MongoDB configuration (Change this URL to your own DB)
// MONGODB_URI: mongodb://heroku_zvxsf3ss:88phc030n4lqsr1eitgg8ca4bi@ds115583.mlab.com:15583/heroku_zvxsf3ss
//local: mongodb://localhost:27017/plantsdb
mongoose.connect("mongodb://localhost:27017/plantsdb", { useMongoClient: true });
var db = mongoose.connection;

db.on("error", function(err) {
    console.log("Mongoose Error: ", err);
});

db.once("open", function() {
    console.log("Mongoose connection successful.");
});


//Gets Plant data
app.get("/api", function(req, res) {
    // This GET request will search all the plant data
    Plant.find({}).exec(function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.send(doc);
            // console.log("back end results", doc)
        }
    });
});

// The route we will send POST requests to save new plants.
app.post("/userPlant", function(req, res) {

    var newPlant = new UserPlant(req.body.plant);

    newPlant.save(function(err, doc) {
        if (err) {
            res.send(err);
        } else {
            User.findOneAndUpdate({ _id: req.body.userId }, { $push: { "plants": doc._id } }, { new: true }, function(err, newdoc) {
                // Send any errors to the browser
                if (err) {
                    res.send(err);
                }
                // Or send the newdoc to the browser
                else {
                    res.send(newdoc);
                }
            });
        }
    });
});

// Route to post new reminder for plant
app.post("/app/new/:id", function(req, res) {

    let plantId = req.params.id;

    UserPlant.findOneAndUpdate({
        _id: plantId
    }, {
        $push: {
            "reminders": req.body
        }
    }, {
        new: true
    }, function(err, newdoc) {
        // Send any errors to the browser
        if (err) {
            res.send(err);
        }
        // Or send the newdoc to the browser
        else {
            res.send(newdoc);
        }
    });
});

//test Google OAuth
app.get("/logintest", function(req, res) {
    console.log("hey!");
    res.sendFile(__dirname + "/public/login.html");
});

// GET route to display reminders
app.get("/app/reminders", function(req, res) {
    // store logged in user's id
    var userID = req.user._id;
    // mongo query to find user by id in the User collection of our DB
    var userQuery = User.findById(userID).select('plants');
    // execute query
    userQuery.exec(function(err, doc) {
        if (err) return next(err);
        // mongo query to find and user plant documents for the user and return any reminders they have saved
        var plantQuery = UserPlant.find({
            '_id': {
                $in: doc.plants
            }
        }, {
            "reminders": {
                $exists: true,
                $not: {
                    $size: 0
                }
            }
            // only return the reminders, plant name and image URL from the query
        }).select('reminders name nickname imageURL');
        // execute query and send result to front end
        plantQuery.exec(function(err, reminders) {
            res.send(reminders);
        });
    });
});

// Route to delete a saved reminder route
app.delete("/app/delete/:id", function(req, res) {

    var id = req.params.id;
    console.log(id)
    UserPlant.findOne({ 'reminders._id': id }, function(err, result) {

        // UserPlant.reminders.id(id).remove().exec(function(err) {
        if (err) {
            console.log(err);
        } else {
            result.reminders.id(id).remove();
            result.save();
            res.send("Deleted");
        }
    });
});

// Route to get all of user's plants
app.get("/user/plants", function(req, res) {
    // store logged in user's id
    var userID = req.user._id;
    // mongo query to find user by id in the User collection of our DB
    var userQuery = User.findById(userID).select('plants');
    // execute query
    userQuery.exec(function(err, doc) {
        if (err) return next(err);
        // mongo query to find and user plant documents for the user and return any reminders they have saved
        var plantQuery = UserPlant.find({
            '_id': {
                $in: doc.plants
            }
        })
        plantQuery.exec(function(err, plants) {
            res.send(plants);
        });
    });
});

//write ics file for user download
app.post("/calendar", function(req, res) {
    // console.log(req.body);
    var event = req.body;
    // console.log(event);
    var icsString = "";

    for (var i = 0; i < event.length; i++) {

        var date = event[i].date.split("/");
        // console.log(date);

        var ics = new ICS();

        ics.createEvent({
            start: "2017-" + date[0] + "-" + date[1] + " 18:00",
            end: "2017-" + date[0] + "-" + date[1] + " 21:00",
            title: event[i].type + " " + event[i].plant,
            description: 'Trees and plants always look like the people they live with, somehow.',
            url: 'http://plantr.com',
            status: 'confirmed',
            alarms: [
                { action: 'DISPLAY', trigger: '-PT24H', description: 'Reminder', repeat: true, duration: 'PT15M' },
                { action: 'AUDIO', trigger: '-PT30M' }
            ]
        }, function(req, res) {

            // console.log(res);
            var newString1 = res.split("PRODID:-//Adam Gibbons//agibbons.com//ICS: iCalendar Generator");
            var newString2 = newString1[1].split("END:VCALENDAR");
            // console.log(newString2[0]);

            icsString = icsString + "\r\n" + newString2[0];
            icsWrite(icsString);

        });
    }   
});


function icsWrite(icsString){

    //combining all new events together
    var finalString = "BEGIN:VCALENDAR\r\nPRODID:-//Google Inc//Google Calendar 70.9054//EN\r\nVERSION:2.0\r\nCALSCALE:GREGORIAN\r\nMETHOD:PUBLISH\r\nX-WR-TIMEZONE:America/Chicago\r\nBEGIN:VTIMEZONE\r\nTZID:America/Chicago\r\nX-LIC-LOCATION:America/Chicago\r\nBEGIN:DAYLIGHT\r\nTZOFFSETFROM:-0600\r\nTZOFFSETTO:-0500\r\nTZNAME:CDT\r\nDTSTART:19700308T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\r\nEND:DAYLIGHT\r\nBEGIN:STANDARD\r\nTZOFFSETFROM:-0500\r\nTZOFFSETTO:-0600\r\nTZNAME:CST\r\nDTSTART:19701101T020000\r\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\r\nEND:STANDARD\r\nEND:VTIMEZONE"

        +
        "\r\n" + icsString +

        "\r\nEND:VCALENDAR";

      // console.log(finalString);

    fs.writeFile(__dirname + "/public/plantr_calendar.ics", finalString, function(err) {

        // If the code experiences any errors it will log the error to the console.
        if (err) {
            return console.log(err);
        }
        // Otherwise, it will print: "movies.txt was updated!"
        // console.log("plantr_calendar.ics was updated!");
    });
}


// Route to get data for plant profile page
app.get("/app/profile/:id", function(req, res) {
    let plantId = req.params.id
    UserPlant.findById(plantId, function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.send(doc);
            // console.log("Profile Page ", doc)
        }
    });

});

//delet user plant
app.post("/user/plants/:id", function(req, res) {
    var plantId = req.params.id;
    // console.log("server", plantId);
    // console.log(req.user.id);
    var userId = req.user.id;

    User.findOneAndUpdate({ _id: userId }, { $pull: { plants: plantId } }, { new: true }, function(err, newdoc) {
        // Send any errors to the browser
        if (err) {
            res.send(err);
        }
        // Or send the newdoc to the browser
        else {
            res.send(newdoc);
        }
    });
});

// load our routes and pass in our app and fully configured passport
require('./app/loginRoutes.js')(app, passport);

// Starting our express server
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});