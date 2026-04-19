import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Wordle_Logo from './assets/wordle_logo.png'
import './App.css'
import GameSettings from './components/gameSettings';
import InputFeedback from './components/InputFeedback';


function App() {
  const [settings, setSettings] = useState({wordLength: 5,allowDuplicates:false});
  const [word, setWord] = useState('');
  const [gameStatus, setGameStatus] = useState('loading');

  useEffect(() => {
    const fetchWord = async () => {
      //reset game state, start new game, etc.
      setGameStatus('loading');
      const { wordLength, allowDuplicates } = settings;
        try {
            const res = await fetch(`/api/word?length=${wordLength}&allowDuplicates=${allowDuplicates}`);
            const data = await res.json();
            console.log('Fetched word:', data.word);
            setWord(data.word);
            setGameStatus('playing');
            //set word, game set to playing, reset guess timer, etc.
        } catch (err) {
            console.error('Failed to fetch word:', err);
        }
      };
    fetchWord();
  }, [settings]);

  function handleSettingsChange(newSettings) {
        setSettings(newSettings);
  }

  function handleGuessSubmit(feedback) {
    console.log('Guess submitted! Received feedback:', feedback);
    //guess array state for visual feedback, check if user win or lose, 
  }

  return (
      <section id="center">
        <div className="hero">
          <img src={Wordle_Logo} className="base" width="170" height="179" alt="" />
         
        </div>
        <div>
          <h1>Wordle</h1>
          <GameSettings settings={settings} onChange={handleSettingsChange} />
          <p>
            Lets play <code>the wordle</code> game and set the highest score
          </p>
          {gameStatus === 'loading' && <p>Loading word...</p>}
        
          {gameStatus === 'playing' && (
            <InputFeedback 
              word={word} 
              wordLength={settings.wordLength} 
              onGuessSubmit={handleGuessSubmit} 
            />
          )}
        </div>
      </section>
        )
}

export default App
