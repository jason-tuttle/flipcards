const request = require('supertest');
const assert = require('assert');
const expect = require('chai').expect;
const app = require('../app');
// for our models' sake
const mongoose = require('mongoose');
const config = require("../config")[process.env.NODE_ENV || 'test'];
const Flipcard = require("../models/flipcards").Flipcard;
const seedData = require('../seeder/data');

before("connect to Mongo", function (done) {
  mongoose.connect(config.mongoURL, {useMongoClient: true}).then(() => done());
});

after("drop database", function (done) {
  mongoose.connection.dropDatabase(done);
});

// TEST PASSED
describe("GET /deck", function () {

  before("add some test data", function(done) {
    Flipcard.insertMany(seedData)
    .then(() => done())
    .catch((err) => {
      console.log(err);
      done();
    });
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
// TEST PASSED
describe("POST /deck", function() {

  afterEach("remove added test data", function(done) {
    Flipcard.deleteOne({'deckName':'History'})
      .then(() => done())
      .catch(err => {
        console.log(err);
        done();
    });
  });

  it("should return successfully", function (done) {
    request(app)
      .post("/deck")
      .type('form')
      .send({'deckName': 'History'})
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function (res) {
        assert.equal(res.body['status'], "success");
      })
      .end(done);
  });

  it("should return json data", function(done) {
    request(app)
      .post("/deck")
      .type('form')
      .send({'deckName': 'History'})
      .expect(function(res) {
        assert.notEqual(res.body.data.length, 0);
      })
      .end(done);
  });
  it("should return the new deck", function(done) {
    request(app)
      .post("/deck")
      .type('form')
      .send({'deckName': 'History'})
      .expect(function(res) {
        assert.equal(res.body.data.deckName, "History");
      })
      .end(done);
  });
});

// GET /:deck/cards       GET the cards from /:deck
describe("GET /[deck]/cards", function() {

  before("add some test data", function(done) {
    Flipcard.insertMany(seedData)
    .then(() => done())
    .catch((err) => {
      console.log(err);
      done();
    });
  });

  after("remove test data", function(done) {
    Flipcard.deleteMany({}).then(() => done()).catch(done);
  });

  it("Should return successfully", function(done) {
    request(app)
      .get("/Math/cards")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function (res) {
        assert.equal(res.body['status'], "success");
      })
      .end(done);
  });

  it("Should return json data", function(done) {
    request(app)
      .get("/Math/cards")
      .expect(function(res) {
        assert.notEqual(res.body.data.length, 0);
      })
      .end(done);
  });

  it("Should return an array of 3 cards", function(done) {
    request(app)
      .get("/Math/cards")
      .expect(function(res) {
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('cards');
        expect(res.body.data.cards).to.be.an('array');
        expect(res.body.data.cards).to.have.lengthOf(3);
      })
      .end(done)
  });
})
