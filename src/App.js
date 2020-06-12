import React, { useState } from 'react';
import './App.css';

import Button from './components/Button/Button.js';
import Prompt from './components/Prompt/Prompt.js';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Prompt</h1>
        <p>Daily stories for everyone, by anyone</p>
      </header>

      <div className="App-Prompt">
          <Prompt 
          date="june 12, 2020">
            <p>What is the meaning of life?</p>
            </Prompt>
        </div> 
        </div>


      
         
  );
}

export default App;
