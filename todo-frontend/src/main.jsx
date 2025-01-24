//Main entry point for the react application

// React core imports
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

//Gloval styles
import './index.css'

//Root component
import App from './App.jsx'

//Create and render the root component
createRoot(document.getElementById('root')).render(
  //In React Strict Mode, components' lifecycle methods and effects are called twice in development mode. This ensures that there are no unwanted side effects and that 
  <StrictMode>      
    <App />
  </StrictMode>,
)
