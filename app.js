const express = require('express');
const app = express();
const quizRouter = require('./routes/quiz');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
// model setup
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Flipcard = require('./models/flipcards').Flipcard;
// Default to the "development" environment.
const nodeEnv = process.env.NODE_ENV || "development";
const config = require("./config.json")[nodeEnv];

mongoose.connect(config.mongoURL, {useMongoClient: true});



app.get('/register', function(req, res) {
  res.json({'status': 'No registration function yet'});
});

// GET  /deck             a list of decks
app.get('/deck', function(req, res){
  const query = Flipcard.find()
  query.select('deck')
  query.exec(function(err, results){
      if (err) {
        res.json({'status': 'failed', 'error': err})
      } else {
        let decklist = [];
        results.forEach(function(card) {
          if (!decklist.includes(card.deck)) {
            decklist.push(card.deck);
          }
        });
        res.json({'status': 'success', 'data': decklist});
      }

    });
});
// POST /deck             CREATE a deck of flipcards
app.post('/deck', function(req, res) {
  
  Flipcard.insert()
});

// GET /:deck/cards       list /:deck's cards
// PATCH /:deck/card/:id  EDIT a card's data
// POST /:deck/cards      CREATE a new card in /:deck

app.use('/quiz', quizRouter);

if (require.main === module) {
    app.listen(3000, function() { console.log("Port 3000 is Comfortably Numb");});
}


module.exports = app;
