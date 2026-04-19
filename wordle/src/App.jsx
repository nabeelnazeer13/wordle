import { useState, useEffect } from 'react'
import Wordle_Logo from './assets/wordle_logo.png'
import './App.css'
import GameSettings from './components/gameSettings';
import InputFeedback from './components/InputFeedback';
import GameBoard from './components/GameBoard';
import GameScore from './components/GameScore';

const MAX_GUESSES = 6;


function App() {
  const [settings, setSettings] = useState({wordLength: 5,allowDuplicates:false});
  const [word, setWord] = useState('');
  const [gameStatus, setGameStatus] = useState('loading');
  const [guesses, setGuesses] = useState([]);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    const fetchWord = async () => {
      //reset game state, start new game, etc.
      setGameStatus('loading');
      setGuesses([]);
      const { wordLength, allowDuplicates } = settings;
        try {
            const res = await fetch(`/api/word?length=${wordLength}&allowDuplicates=${allowDuplicates}`);
            const data = await res.json();
            console.log('Fetched word:', data.word);
            setWord(data.word);
            setGameStatus('playing');
            setStartTime(Date.now());            
        } catch (err) {
            console.error('Failed to fetch word:', err);
        }
      };
    fetchWord();
  }, [settings]);

  function handleSettingsChange(newSettings) {
    setSettings(newSettings);
  }

  function handleNewGame() {
    setSettings({ ...settings });
  }

  function handleGuessSubmit(feedback) {
    console.log('Guess submitted! Received feedback:', feedback);
    const newGuesses = [...guesses, feedback];
    setGuesses(newGuesses);
    const won = feedback.every(f => f.result === 'correct');
    if (won) {
      console.log('User wins!');
      setGameStatus('won');
    } else if (newGuesses.length >= MAX_GUESSES) {
      console.log('No more guesses. Game lost.');
      setGameStatus('lost');
    }
  }
     
  

  return (
      <section id="center">
        <div className="hero">
          <img src={Wordle_Logo} className="base" width="170" height="179" alt="" />
         
        </div>
        <div>
          <h1>Wordle</h1>
          <GameSettings settings={settings} onChange={handleSettingsChange} />
          
          {gameStatus === 'loading' && <p>Loading word...</p>}
        
          {gameStatus === 'playing' && (
            <>
            <GameBoard 
              guesses={guesses} 
              wordLength={settings.wordLength} 
              maxGuesses={MAX_GUESSES} 
            />
            <InputFeedback 
              word={word} 
              wordLength={settings.wordLength} 
              onGuessSubmit={handleGuessSubmit} 
            />
            <button onClick={handleNewGame}>New Game</button>
            </>
          )}

          {gameStatus === 'won' && (
            <>
              <GameScore
                  guessCount={guesses.length}
                  startTime={startTime}
                  settings={settings}
              />
              <button onClick={handleNewGame}>New Game</button>
            </>
                
          )}

          {gameStatus === 'lost' && (
            <>
              <p>Game over! The word was: <strong>{word}</strong></p>
              <button onClick={handleNewGame}>New Game</button>
            </>
          )}
        </div>
      </section>
  );
}

        


export default App
