const express = require('express');
const app = express();
const quizRouter = require('./routes/quiz');
// model setup
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Flipcards = require('./models/flipcards');
// Default to the "development" environment.
const nodeEnv = process.env.NODE_ENV || "development";
const config = require("./config.json")[nodeEnv];

mongoose.connect(config.mongoURL, {useMongoClient: true});



app.get('/register', function(req, res) {
  res.json({'status': 'No registration function yet'});
});

// GET  /deck             a list of decks
app.get('/deck', function(req, res){
  Flipcards.find()
    .select('deck')
    .exec(function(err, results){
      res.json(results);
    })
});
// POST /deck             CREATE a deck of flipcards
// GET /:deck/cards       list /:deck's cards
// PATCH /:deck/card/:id  EDIT a card's data
// POST /:deck/cards      CREATE a new card in /:deck

app.use('/quiz', quizRouter);

if (require.main === 'module') {
    app.listen(3000, function() { console.log("Port 3000 is Comfortably Numb");});
}


module.exports = app;
