// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Require Plant, User, and User's Plants schemas
var Plant = require("./models/plant");
var User = require("./models/user");
var UserPlant = require("./models/userPlant")

var flash = require('connect-flash');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

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
// mongoose.connect("mongodb://heroku_6hktlx01:9r0nhq6bqf0cf7efnncpb4jtla@ds153732.mlab.com:53732/heroku_6hktlx01");
mongoose.connect("mongodb://localhost:27017/plantsdb", { useMongoClient: true });
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

app.get("/api/user", function(req, res) {
    

});
//Gets Plant data
app.get("/api", function(req, res) {
  // This GET request will search all the plant data
  Plant.find({}).exec(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});

// The route we will send POST requests to save new plants.
app.post("/api", function(req, res) {

  var newPlant = new UserPlant(req.body);
  
  newPlant.save(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send("Saved New Plant");
    }
  });
});

//test Google OAuth
app.get("/logintest", function(req, res){
  console.log("hey!");
  res.sendFile(__dirname + "/public/login.html");
});

// TO DO: ROUTE TO GRAB ALL USER'S ALERTS FROM DB
// app.get("/api/reminders", function(req, res) {
//   //query with mongoose
//     var query = UserPlant.find({"reminders":{ $exists: true, $not: {$size: 0} }}).select('reminders name imageURL');

//     query.exec(function (err, doc) {
//         if (err) return next(err);
//         res.send(doc);
//     });
//   // Plant.find({reminders:1, _id:0})
//   //   .exec(function(err, doc) {

//   //     if (err) {
//   //       console.log(err);
//   //     }
//   //     else {
//   //       res.send(doc);
//   //     }
//   //   });
// });

 // load our routes and pass in our app and fully configured passport
require('./app/loginRoutes.js')(app, passport);

// Starting our express server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
