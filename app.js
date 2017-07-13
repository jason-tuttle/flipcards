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

if (require.main === module) {
    mongoose.connect(config.mongoURL, {useMongoClient: true});
}




app.get('/register', function(req, res) {
  res.json({'status': 'No registration function yet'});
});

// GET  /deck             a list of decks
app.get('/deck', function(req, res){
  const query = Flipcard.find()
  query.select('deckName')
  query.exec(function(err, results){
      if (err) {
        res.json({'status': 'failed', 'error': err})
      } else {
        res.json({'status': 'success', 'data': results});
      }

    });
});

// POST /deck             CREATE a deck of flipcards
app.post('/deck', function(req, res) {
  Flipcard.create({'deckName': req.body.deckName, 'cards':[]})
    .then(result => res.json({'status': 'success', 'data':result}))
    .catch(err => res.json({'status':'failed', 'error':err}));
});

// GET /:deck/cards       list /:deck's cards
app.get('/:deck/cards', function(req, res) {
  Flipcard.findOne({'deckName': req.params.deck})
    .select('cards')
    .then(result => res.json({'status': result ? 'success' : 'failed' ,'data':result}))
    .catch(err => res.json({'status':'failed','error':'err'}));
});

// PATCH /:deck/card/:id  EDIT a card's data
app.patch('/:deck/card/:id', function(req, res) {
  
});
// POST /:deck/cards      CREATE a new card in /:deck

app.use('/quiz', quizRouter);

if (require.main === module) {
    app.listen(3000, function() { console.log("Port 3000 is Comfortably Numb");});
}


module.exports = app;
