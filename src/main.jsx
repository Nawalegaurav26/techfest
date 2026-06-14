import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

console.log('%c TECHFEST 2026 // SYSTEM ONLINE ', 'background: #00f2ff; color: #050508; font-weight: bold; font-size: 14px; padding: 4px;');
console.log('%c CYBERNETIC EVOLUTION PROTOCOLS INITIATED. ', 'color: #00f2ff; font-family: monospace; font-size: 12px;');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
