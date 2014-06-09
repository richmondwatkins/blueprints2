'use strict';

var traceur = require('traceur');
var Building = traceur.require(__dirname + '/building.js');
var buildingCollection = global.nss.db.collection('buildings');

var Mongo = require('mongodb');


class Room{
  static create(obj, fn){

    var room = new Room();
    room.name = obj.name;
    room.begin = obj.begin;
    room.end = obj.end;
    room.floorId = Mongo.ObjectID(obj.floorId);
    Building.findById(obj.buildingId, building=>{
      building.rooms.push(room);
      buildingCollection.update({_id:building._id},{$push:{room:room}}, ()=>fn(building));
    });

  }
}


module.exports = Room;
