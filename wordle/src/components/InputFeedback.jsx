import { useState } from 'react';
import { compare_feedback } from '../wordle_core_algorithm'

function InputFeedback({ word, wordLength, onGuessSubmit }) {
    const [currentGuess, setCurrentGuess] = useState('');
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        if (currentGuess.length !== wordLength) {
            setError(`Enter ${wordLength} letter words to submit your guess.`);
            return;
        }

        const feedback = await compare_feedback(
            currentGuess.toLowerCase(),
            word.toLowerCase()
        );

        onGuessSubmit(feedback);
        setCurrentGuess('');
        setError('');
    }

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: 16, color: 'white', fontSize: 18 }}>
            <input
                type="text"
                value={currentGuess}
                onChange={e => setCurrentGuess(e.target.value)}
                maxLength={wordLength}
                placeholder={`Enter a ${wordLength}-letter word`}
                autoFocus
                style={{ marginTop: 16, marginRight: 8, padding: '6px 10px', fontSize: 18, color: 'white', backgroundColor: '#333', border: '1px solid #555', borderRadius: 4 }}
            />
            <button type="submit" style={{ padding: '6px 14px', fontSize: 16, color:'black' }}>
                Guess
            </button>
            {error && <p style={{ color: 'red', marginTop: 4 }}>{error}</p>}
        </form>
    );
}

export default InputFeedback;