const express = require('express');
const router = express.Router();

router.get('/about', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>About my Wordle like game</title>
        <style>
          body { font-family: sans-serif; max-width: 600px; margin: 40px auto; padding: 0 20px; }
        </style>
      </head>
      <body>
        <h1>The barebone wordle</h1>
        <p>This is a Wordle-inspired game built by me.</p>
        <p>Guess the secret word — each guess gives you color feedback on which letters are correct, misplaced, or wrong.</p>
        <h2>How to play</h2>
        <ol>
          <li>Choose your game settings (word length and whether duplicates are allowed).</li>
          <li>Make a guess to find the secret word.</li>
          <li>See feedback on your guess and try again until you find the word.</li>
        </ol>
        <h2>What do the colors mean?</h2>
        <ul>
          <li><span style="background-color: #6aaa64; color: white;">Green</span> — Correct letter in the correct position</li>
          <li><span style="background-color: #c9b458; color: white;">Yellow</span> — Correct letter in the wrong position</li>
          <li><span style="background-color: #3a3a3c; color: white;">Gray</span> — Letter is not in the word</li>
        </ul>
        <h1>Good luck!</h1>
        <a href="/">Play the game</a>
      </body>
    </html>
  `);
});

module.exports = router;