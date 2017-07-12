// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Set mongoose to leverage built in JavaScript ES6 Promises
// mongoose.Promise = Promise;

// Require Plant schema
var Plant = require("./models/plant");

// Create a new express app
var app = express();
// Sets an initial port
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// MongoDB configuration (Change this URL to your own DB)
// mongoose.connect("mongodb://heroku_6hktlx01:9r0nhq6bqf0cf7efnncpb4jtla@ds153732.mlab.com:53732/heroku_6hktlx01");
mongoose.connect("mongodb://localhost/plantsdb")
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
    }
    else {
      res.send(doc);
    }
  });
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
