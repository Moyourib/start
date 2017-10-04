'use strict';

// const express = require("express");
// const path = require("path");
// const bodyParser = require("body-parser");
// const morgan = require("morgan");
// const app = require("../app");

// const models = require("../../models");
// const Hotel = models.Hotel;
// const Restaurant = models.Restaurant;
// const Activity = models.Activity;
// const Place = models.Place;

const router = require('express').Router();
const {Hotel, Restaurant, Activity} = require('../../models');

router.get('/api', function(req, res, next) {
  Promise.all([
    Hotel.findAll( {include: [{all:true}]} ),
    Restaurant.findAll( {include: [{all:true}]} ),
    Activity.findAll( {include: [{all:true}]} )
  ])
  .then( (allAttractions) => {res.json(allAttractions)})
  .catch(next)
});

router.use(function(req, res, next) {
    next();
});

module.exports = router;
