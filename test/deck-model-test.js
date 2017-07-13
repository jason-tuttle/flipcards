const request = require('supertest');
const assert = require('assert');
const app = require('../app');
// for our models' sake
const mongoose = require('mongoose');
const config = require("../config")[process.env.NODE_ENV || 'test'];
const Flipcard = require("../models/flipcards").Flipcard;
const seedData = require('../seeder/data');

before("connect to Mongo", function (done) {
  // mongoose.connect(config.mongoURL).then(done);
  console.log("Starting test");
  done();
});

after("drop database", function (done) {
  mongoose.connection.dropDatabase(done);
});

// TEST PASSED
describe("GET /deck", function () {

  before("add some test data", function(done) {
    Flipcard.insertMany(seedData)
    .then(function(results) {
      if (err) {
        console.log(`something went wrong: ${err}`);
      } else {
        console.log("successfully added records for testing");
      }
      done();
    })
    .catch(done);
  });

  after("remove test data", function(done) {
    Flipcard.deleteMany({}).then(() => done()).catch(done);
  });

  it("should return successfully", function (done) {
    request(app)
      .get("/deck")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function (res) {
        assert.equal(res.body['status'], "success");
      })
      .end(done);
  });
  it("should return json data", function(done) {
    request(app)
      .get("/deck")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function(res) {
        assert.notEqual(res.body.data.length, 0);
      })
      .end(done);
  });
  it("should return 2 decks", function(done) {
    request(app)
      .get("/deck")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function(res) {
        assert.equal(res.body.data.length, 2);
      })
      .end(done);
  });
});

// POST /deck             CREATE a deck of flipcards
//
describe("POST /deck", function() {

})
