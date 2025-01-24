// Main Libraries and Dependencies
import { useEffect } from 'react'
import axiosInstance from '../api/axiosInstance';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  //used to  set up routing in a React application

//Components
import { ThemeProvider } from './components/ThemeProvider';
import Sidebar from './components/Sidebar'
import TodoBody from './components/TodoBody';

//Styles
import './App.css'

/**
 * Root component of the application
 * Handles routing and main layout structure
 * Wraps application with ThemeProvider for dark/light mode
*/

function App() {
  
  return (
    <Router>
    <ThemeProvider>
      <Routes>
        {/** Main Application route */}
        <Route path='/' element={
            <div className="app-container">
            <Sidebar />
            <div className="main-content">
              <TodoBody/>
            </div>
          </div>
        } />
      </Routes>
    </ThemeProvider>
    </Router>
  );
}

export default App