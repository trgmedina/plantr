// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Require Plant and User schema
var Plant = require("./models/plant");
var User = require("./models/user");

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

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// Set mongoose to leverage built in JavaScript ES6 Promises
// mongoose.Promise = Promise;

// Require Plant and User schema
var Plant = require("./models/plant");
var User = require("./models/user");

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// MongoDB configuration (Change this URL to your own DB)
// mongoose.connect("mongodb://heroku_6hktlx01:9r0nhq6bqf0cf7efnncpb4jtla@ds153732.mlab.com:53732/heroku_6hktlx01");
mongoose.connect("mongodb://localhost:27017/plantsdb")
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
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

  var newPlant = new Plant(req.body);
  
  newPlant.save(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send("Saved New Plant");
    }
  });

  //   Plant.create({
  //   name: req.body.name,
  //   description: req.body.description,
  //   origin: req.body.origin,
  //   sunlightAmt: req.body.sunlightAmt,
  //   waterSchedule: req.body.waterSchedule,
  //   imageURL: req.body.imageURL
  // }, function(err) {
  //   if (err) {
  //     console.log(err);
  //   }
  //   else {
  //     res.send("Saved New Plant");
  //   }
  // });
});

//test Google OAuth
app.get("/login", function(req, res){
  console.log("hey!");
  res.sendFile(__dirname + "/public/login.html");
});

// Starting our express server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
