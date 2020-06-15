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
        <h1 className="App-title">daily milk</h1>
      <br />
       <p>Stories for everyone, by anyone</p>
       <div className="App-links">
        <Link to="/">Daily Prompt</Link>
        <Link to="/blog/">Today's Writings</Link>
        <Link to="/daily/">Previous Days</Link>
        </div>
      </nav>

      <div className="App-mainContent">
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/blog/' component={Blog} />
          <Route exact path='/write/' component={LandingPage} /> 
        </Switch>
      </div>
    </div>
  );
}

export default App;
