if(window.self !== window.top) {
  document.body.innerHTML="<h2>Access Denied: C;ickjacking Attempt Detected</h2>";
}
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
