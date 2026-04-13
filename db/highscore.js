const mongoose = require('mongoose');

const highscoreSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        guesses: { type: Number, required: true },
        time: { type: Number, required: true },
        wordLength: { type: Number, required: true },
        duplicatesAllowed: { type: Boolean, required: true },
    },
    { timestamps: true }
);

const Highscore = mongoose.model('Highscore', highscoreSchema);

module.exports = Highscore;