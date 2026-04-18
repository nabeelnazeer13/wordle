import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import GameSettings from './components/GameSettings';

function App() {
  const [settings, setSettings] = useState({wordLength: 5,allowDuplicates:false});

  useEffect(() => {
    const fetchWord = async () => {
      //reset game state, start new game, etc.
      const { wordLength, allowDuplicates } = settings;
        try {
            const res = await fetch(`/api/word?length=${wordLength}&allowDuplicates=${allowDuplicates}`);
            const data = await res.json();
            console.log('Fetched word:', data.word);
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

  return (
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Wordle</h1>
          <GameSettings settings={settings} onChange={handleSettingsChange} />
          <p>
            Lets play <code>the wordle</code> game and set the highest score
          </p>
        </div>
      </section>
        )
}

export default App
