import React, { useState } from 'react';
import './App.css';

import Button from './components/Button/Button.js';
import Prompt from './components/Prompt/Prompt.js';


function App() {
  return (
    <div className="Container">
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Prompt</h1>
        <p className="App-subtitle">daily stories for everyone, by anyone</p>
      </header>

      <div className="App-Prompt">
        <div>
          <Prompt 
          date="june 12, 2020">
            <p>What is the meaning of life?</p>
            </Prompt>
        </div>
        {/* <div>
          <h1>Buttons</h1>

          <Button onClick={() => console.log('Button 1')}>
            Button 1
          </Button>

          <Button type="gray" onClick={() => console.log('Button 2')}>
            Button 2
          </Button>

          <Button type="primary" onClick={() => console.log('Button 3')}>
            Button 3
          </Button>
        </div> */}
        </div>
</div>
</div>
      
         
  );
}

export default App;
