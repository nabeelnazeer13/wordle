const app = require('./app.js');
const connectDB = require('./db/db.js');
const Highscore = require('./db/highscore');
const { loadWords } = require('./db/words');

const PORT = 5080;
async function startServer() {
    try {      
    await connectDB();

   /* const testScore = new Highscore({
        name: 'TestPlayer2',
        guesses: 4,
        time: 42,
        wordLength: 5,
        duplicatesAllowed: false,
  });
  await testScore.save();
  console.log('Test score saved:', testScore);  */

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        loadWords();
    });
    } catch (error) {
        console.error('Failed to start server:', error);
    }



}
startServer();


