import React from 'react';
import { Link, Switch, Route } from 'react-router-dom'

import './App.css';

import LandingPage from './components/pages/LandingPage/LandingPage.js';
import Blog from './components/pages/Blog/Blog.js';
import DailyPost from './components/pages/DailyPost/DailyPost.js';
import WriteArticle from './components/pages/WriteArticle/WriteArticle.js';

function App () {
  return (
    <div className="App">
      <nav className="App-navigation">
        <div>
        <h1 className="App-title">Daily Milk</h1>
      <br />
       <p><em>Stories for everyone, by anyone</em></p>
       </div>
       <div className="App-links">
        <Link to="/">Daily Prompt&nbsp;&nbsp;&nbsp;</Link>
        <Link to="/blog/">Previous Prompts</Link>
        </div>
      </nav>

      <div className="App-mainContent">
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/blog/' component={Blog} />
          <Route exact path='/createprompt/' component={WriteArticle} /> 
        </Switch>
      </div>
    </div>
  );
}

export default App;
