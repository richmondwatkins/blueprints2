'use strict';

var traceur = require('traceur');
var Location = traceur.require(__dirname + '/../models/location.js')

exports.new = (req, res)=>{
  console.log('MADE IT TO NEW');
  res.render('locations/new', {title: 'New'});
};

exports.index = (req, res)=>{
  Location.findAll( locations=>{
    res.render('locations/index', {locations:locations, title: 'Index'});
  });
};

exports.create = (req, res)=> {
  Location.create(req.body, ()=>{
    res.redirect('/locations');
  });
};
