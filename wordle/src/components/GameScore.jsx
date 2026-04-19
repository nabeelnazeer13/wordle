import { useState } from 'react';

function GameScore({ guessCount, startTime, settings }) {
    const [playerName, setPlayerName] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const [timeSeconds] = useState(() => Math.floor((Date.now() - startTime) / 1000));

    async function handleSubmit(e) {
        e.preventDefault();

        if (!playerName.trim()) {
            setError('Please enter your name.');
            return;
        }

        const scoreData = {
            name: playerName,
            guesses: guessCount,
            time: timeSeconds,            
            wordLength: settings.wordLength,
            duplicatesAllowed: settings.allowDuplicates,
        };

        try {
            const response = await fetch('/api/score', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(scoreData),
            });

            if (!response.ok) {
                throw new Error('Failed to save score');
            }

            setSubmitted(true);
        } catch (err) {
            setError('Could not save score. Please try again.');
            console.error(err);
        }
    }

    if (submitted) {
        return <p>✅ Score saved! Well played.</p>;
    }

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
            <h2>Submit your score</h2>
            <p>Guesses used: {guessCount}</p>
            <p>Time: {timeSeconds} seconds</p>

            <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                Your name:
                <input
                    type="text"
                    value={playerName}
                    onChange={e => setPlayerName(e.target.value)}
                    placeholder="Enter your name"
                    style={{ padding: '4px 8px', fontSize: 16 }}
                />
            </label>

            <button type="submit" style={{ padding: '6px 14px', fontSize: 16 }}>
                Save Score
            </button>

            {error && <p style={{ color: 'red', marginTop: 8 }}>{error}</p>}
        </form>
    );
}

export default GameScore;