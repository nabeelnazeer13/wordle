const app = require('./app.js');
const connectDB = require('./db/db.js');
const Highscore = require('./db/highscore');
const words = require('./db/words');

const PORT = 5080;
async function startServer() {
    try {      
    await connectDB();

   /* const testScore = new Highscore({
        name: 'TestPlayer',
        guesses: 3,
        time: 45,
        wordLength: 5,
        duplicatesAllowed: false,
  });
  await testScore.save();
  console.log('Test score saved:', testScore); */

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        loadWords();
    });
    } catch (error) {
        console.error('Failed to start server:', error);
    }



}
startServer();


