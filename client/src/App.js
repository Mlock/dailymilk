import React from 'react';
import { Link, Switch, Route } from 'react-router-dom'

import './App.css';

import LandingPage from './components/pages/LandingPage/LandingPage.js';
import HomePage from './components/pages/HomePage/HomePage.js';
import Blog from './components/pages/Blog/Blog.js';
import DailyPost from './components/pages/DailyPost/DailyPost.js';
import WriteArticle from './components/pages/WriteArticle/WriteArticle.js';

function App () {
  return (
    <div className="App">
      <nav className="App-navigation">
        <div>
        <Link to="/"><h1 className="App-title">Daily Milk</h1></Link>
      <br />
       <p className="App-subtitle">Stories for everyone, by anyone.</p>
       </div>
       <div className="App-links">
        <Link to="/dailyprompt/">Today</Link>
        <Link to="/blog/">Previous prompts</Link>
        <Link to="/createprompt/">Submit your own</Link>
        </div>
      </nav>

      <div className="App-mainContent">
        <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/dailyprompt/' component={LandingPage} />
          <Route exact path='/blog/' component={Blog} />
          <Route exact path='/createprompt/' component={WriteArticle} /> 
        </Switch>
      </div>
    </div>
  );
}

export default App;
