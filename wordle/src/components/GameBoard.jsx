

const COLORS = {
    correct: 'green',
    misplaced: 'yellow',
    incorrect: '#888',
    empty: '#eee',
};

function GameBoard({ guesses, wordLength, maxGuesses }) {

    const rows = [...guesses]; 

    while (rows.length < maxGuesses) {
        
        rows.push(Array(wordLength).fill({ letter: '', result: 'empty' }));
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 16, justifyContent: 'center', alignItems: 'center' }}>
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: 'flex', gap: 4 }}>
                    {row.map((cell, colIndex) => (
                        <div
                            key={colIndex}
                            style={{
                                width: 48,
                                height: 48,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: COLORS[cell.result] || COLORS.empty,
                                border: '2px solid #999',
                                borderRadius: 4,
                                fontWeight: 'bold',
                                fontSize: 20,
                                textTransform: 'uppercase',
                                color: cell.result !== 'empty' ? 'black' : '#333',
                            }}
                        >
                            {cell.letter}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default GameBoard;