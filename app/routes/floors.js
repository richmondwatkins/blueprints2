'use strict';

var traceur = require('traceur');
var Floor = traceur.require(__dirname + '/../models/floor.js');
var multiparty = require('multiparty');


exports.index = (req, res)=>{
  Floor.findAll(floors=>{
    res.render('floors/index', {floors:floors, title: 'Index'});
  });
};


exports.new = (req, res)=>{
  res.render('floors/new', {title: 'Node.js: Home'});
};

exports.create = (req, res)=>{
  var form = new multiparty.Form();
  form.parse(req, (err, fields, files)=>{
    fields.photo = files.photo;
    Floor.create(fields, ()=>{
      res.redirect('/floors');
    });
  });
};
