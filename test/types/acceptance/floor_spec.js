/* global describe, it, before, beforeEach, afterEach */
/* jshint expr:true */
'use strict';

process.env.DBNAME = 'blueprint-test';

var expect = require('chai').expect;
var traceur = require('traceur');
var db = traceur.require(__dirname + '/../../helpers/db.js');
var factory = traceur.require(__dirname + '/../../helpers/factory.js');
var app = require('../../../app/app');
var cp = require('child_process');
var request = require('supertest');  //simulates a browser/requrest to your webpage

var Floor;

describe('floors', function(){

    before(function(done){
      db(function(){
        Floor = traceur.require(__dirname + '/../../../app/models/floor.js');
        done();
      });
    });

    beforeEach(function(done){
      global.nss.db.collection('floors').drop(function(){
        cp.execFile(__dirname + '/../../fixtures/before.sh', {cwd:__dirname + '/../../fixtures'}, function(err, stdout, stderr){
          factory('floor', function(floors){
            done();
          });
        });
      });
    });

    afterEach(function(done){
      cp.execFile(__dirname + '/../../fixtures/after.sh', {cwd:__dirname + '/../../fixtures'}, function(err, stdout, stderr){
        done();
      });
    });


  describe('GET /floors/new', function(){
    it('should get the new locations web page', function(done){
      request(app)
      .get('/floors/new')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        done();
      });
    });
  });

  describe('POST /floors', function(){
    it('should save a new floors and redirect', function(done){
      request(app)
      .post('/floors')
      .field('name','tile')
      .field('rate','5')
      .attach('photo', __dirname + '/../../fixtures/copy/tile1-DELETE.png')
      .end(function(err, res){
        expect(res.status).to.equal(302);
        expect(res.headers.location).to.equal('/floors');
        done();
      });
    });
  });
  
  describe('GET /floors', function(){
    it('should display all floors', function(done){
      request(app)
      .get('/floors')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        // expect(res.text).to.include('<p>Gentrify pickled raw denim, vinyl master cleanse meggings beard messenger</p>');
        console.log(res.text);
        done();
      });
    });
  });


});
