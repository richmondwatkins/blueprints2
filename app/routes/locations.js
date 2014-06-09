'use strict';

var traceur = require('traceur');
var Location = traceur.require(__dirname + '../models/location.js');

exports.new = (req, res)=>{
  res.render('locations/new', {title: 'Node.js: Home'});
};

// exports.index = (req, res)=>{
//   res.render('locations/index', {title: 'Node.js: Home'});
// };


exports.create = (req, res)=> {
  Location.create(req.body, ()=>{
    res.redirect('/locations');
  });
};
