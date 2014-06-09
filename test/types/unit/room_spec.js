/* global describe, before, it, beforeEach */
/* jshint expr:true */

'use strict';

process.env.DBNAME = 'blueprint-test';

// var expect = require('chai').expect;
// var Mongo = require('mongodb');
var traceur = require('traceur');
var db = traceur.require(__dirname + '/../../helpers/db.js');
var factory = traceur.require(__dirname + '/../../helpers/factory.js');
var cp = require('child_process');

var User;
var Building;
var Floor;
var Location;
var Room;

describe('Room', function(){
  before(function(done){
    db(function(){
      User = traceur.require(__dirname + '/../../../app/models/user.js');
      Location = traceur.require(__dirname + '/../../../app/models/location.js');
      Building = traceur.require(__dirname + '/../../../app/models/building.js');
      Floor =  traceur.require(__dirname + '/../../../app/models/floor.js');
      Room = traceur.require(__dirname + '/../../../app/models/room.js');
      done();
    });
  });

  beforeEach(function(done){

    global.nss.db.collection('users').drop(function(){
      global.nss.db.collection('locations').drop(function(){
        global.nss.db.collection('buildings').drop(function(){
          global.nss.db.collection('floor').drop(function(){
            cp.execFile(__dirname + '/../../fixtures/before.sh', {cwd:__dirname + '/../../fixtures'}, function(err, stdout, stderr){
              factory('floor', function (floorings){
                factory('user', function(users){
                  factory('location', function(locations){
                    factory('building', function(buildings){
                      done();
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });

  describe('.create', function(){
    it('should create a room', function(done){
      Floor.findById('b123456789abcdef01234568', function(floor){
        Room.create({buildingId: 'c123456789abcdef01234567', floorId: floor._id, name: 'Terrence Room', begin: {x:3,y:3}, end:{x: 5, y: 7}}, function(building){
          console.log('THIS IS THE BUILDING');
          // expect(building).to.be.instanceof(Building);
          console.log(building);
          done();
        });
      });
    });
  });


});
