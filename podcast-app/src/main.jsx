import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css' // Or './index.css' if you used that instead

/**
 * This is the main entry point of the React application.
 * It uses ReactDOM.createRoot to render the App component
 * into the DOM element with the id 'root'.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)