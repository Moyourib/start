'use strict';

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = require("../app");
const models = require("../../models");
const Hotel = models.Hotel;
const Restaurant = models.Restaurant;
const Activity = models.Activity;
const Place = models.Place;

const router = require('express').Router();


router.get('/api', function(req, res, next) {
    var allAttractions = {};
    
    Hotel.findAll( {include: [{all:true}]} )
    .then(function(hotels) {
      allAttractions.hotels = hotels;
      return Restaurant.findAll( {include: [{all:true}]} );
    })
    .then(function(restaurants) {
      allAttractions.restaurants = restaurants;
      return Activity.findAll( {include: [{all:true}]} );
    })
    .then(function(activities) {
      allAttractions.activities = activities;
    })
    .then(function() {
      res.json(allAttractions);
    })
    .catch(next);
})

/* Promise.all([
  Hotel.findAll(),
  Activity.findAll(),
  Restaurant.findAll()
])
.then() */

router.use(function(req, res, next) {
    next();
});

module.exports = router;
