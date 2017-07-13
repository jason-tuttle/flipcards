const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost:27017/flipcard');

const Flipcard = require('../models/flipcards').Flipcard;
const seedData = require('./data');

Flipcard.deleteMany({}).then().catch();

Flipcard.insertMany(seedData, function(err, results) {
  if (err) {
    console.log(`something went wrong: ${err}`);
  } else {
    console.log(`urrthang's hunky dory: ${results}`);
  }
});


mongoose.connection.close()
