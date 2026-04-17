const express = require('express');
const router = express.Router();
const Highscore = require('../db/highscore');

router.get('/highscores', async (req, res) => {
  try {
    const scores = await Highscore.find().sort({ guesses: 1, time: 1 }).limit(20);

    const rows = scores.map((s, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${s.name}</td>
        <td>${s.guesses}</td>
        <td>${s.time}s</td>
        <td>${s.wordLength} letters</td>
        <td>${s.duplicatesAllowed ? 'Yes' : 'No'}</td>
      </tr>
    `).join('');

    const emptyMessage = scores.length === 0
      ? '<p>No scores yet. Be the first to play!</p>'
      : '';

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Highscores</title>
          <style>
            body { font-family: sans-serif; max-width: 700px; margin: 40px auto; padding: 0 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { text-align: left; padding: 10px 12px; border-bottom: 1px solid #ddd; }
            th { background-color: #f4f4f4; }
            a { display: inline-block; margin-top: 24px; }
          </style>
        </head>
        <body>
          <h1>Highscores</h1>
          ${emptyMessage}
          ${scores.length > 0 ? `
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Guesses</th>
                  <th>Time</th>
                  <th>Word length</th>
                  <th>Duplicates</th>
                </tr>
              </thead>
              <tbody>
                ${rows}
              </tbody>
            </table>
          ` : ''}
          <a href="/">← Play the game</a>
        </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send('<h1>Error loading highscores</h1>');
  }
});

module.exports = router;