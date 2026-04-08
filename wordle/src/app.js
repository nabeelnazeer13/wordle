import express from 'express';
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server up and running');
});

app.get('/about', (req, res) => {
  res.send('About page OK');
});

app.get('/highscores', (req, res) => {
  res.send('Highscores page OK');
});

export default app;