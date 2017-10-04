'use strict';

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const db = require("../models").db;
const app = express();

//for logging and bodyparsing our code

app.use(morgan);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false }));

//creates the file serving middleware for our code. yay express.static
app.use(express.static(path.join(__dirname, '..', 'public')));


app.use(function(req, res, next){
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use(function(err, req, res, next){
	console.error(err, error.stack);  //can you please explain this . please
	res.status(err.status || 500);
	res.send('Something went wrong!', err.message);
});

const port = 3000;
app.listen(port, function() {
  console.log("The server is listening closely on port", port);
  db
    .sync()
    .then(function() {
      console.log("Synchronated the database");
    })
    .catch(function(err) {
      console.error("Trouble right here in River City", err, err.stack);
    });
});

