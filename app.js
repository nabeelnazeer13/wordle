const express = require('express');
const { pick_word } = require('./logic/word_picker');
const Highscore = require('./db/highscore');
const aboutRoute = require('./routes/about');
const highscoresRoute = require('./routes/highscores');

const app = express();
app.use(express.json());
app.use(aboutRoute);
app.use(highscoresRoute);

app.get('/', (req, res) => {
  res.send('Server up and running');
});

app.get('/api/word', (req, res) => {
  const word_length = parseInt(req.query.length);
  const duplicates_allowed = req.query.duplicates === 'true';
  const word_list = require('./db/words').loadWords();
  const word = pick_word(word_list, word_length, duplicates_allowed);
  res.json({ word });
});

app.post('/api/score', async (req, res) => {
  try {
    const { name, guesses, time, wordLength, duplicatesAllowed } = req.body;
    const newScore = new Highscore({ name, guesses, time, wordLength, duplicatesAllowed });
    await newScore.save();
    res.status(201).json({ message: 'Score saved', score:newScore });
  } catch (error) {
    res.status(500).json({ message: 'Error saving score', error: error.message });
  }
});

module.exports = app;