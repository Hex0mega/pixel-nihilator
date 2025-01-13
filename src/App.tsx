import { useEffect } from 'react'
import './App.css'
import Game from './game';

const canvas = document.getElementById("pn-canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
let game: Game;
function App() {
  useEffect(() => {
    game = new Game(ctx);
    game.draw();
  }, []);

  const reset = () => {
    game.reset();
  }

  return (
    <div>
      <h1>Pixel Nihilator</h1>
      <button onClick={reset}>Reset</button>
    </div>

  );
}

export default App
