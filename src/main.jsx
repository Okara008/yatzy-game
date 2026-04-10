import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './winner.css'
import './board.css'
import './tutorial.css'
import './responsive.css'
import Game from './Game.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Game />
  </StrictMode>,
)
