'use strict';

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const volleyball = require("volleyball");
const db = require("../models").db; //.db is destructuring db
const app = express();

//for logging and bodyparsing our code
app.use(volleyball);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false }));

//creates the file serving middleware for our code. yay express.static
app.use(express.static('public'));
//OR//app.use(express.static(path.join(__dirname, '..', 'public')));
//AND// app.get('/', (req, res, next) => {
//   res.sendFile(path.join(__dirname, '../public/index.html'));
// });

//requiring and using routes
app.use(require('./api'));

//error handling
app.use(function(req, res, next){
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});
app.use(function(err, req, res, next){
	console.log("Error happened", err);
	res.send('Something went wrong:', err.status || 500, err.stack);
});

db.sync()
.then( () => {
  app.listen(3000, function() {
    console.log("The server is listening on 3000");
  })
})
.catch(function(err) {
  console.error("Trouble! Right here in River City:", err, err.stack);
});