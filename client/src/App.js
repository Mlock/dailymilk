import React from 'react';
import { Link, Switch, Route } from 'react-router-dom'

import './App.css';

import LandingPage from './components/pages/LandingPage/LandingPage.js';
import Blog from './components/pages/Blog/Blog.js';
import WriteArticle from './components/pages/WriteArticle/WriteArticle.js';

function App () {
  return (
    <div className="App">
      <nav className="App-navigation">
        <h1 className="App-title">Prompt</h1>
      
       <p>Daily stories for everyone, by anyone</p>
        <Link to="/">Daily Prompt</Link>
        <Link to="/blog/">Blog</Link>
        <Link to="/write/">Previous Days</Link>
      </nav>

      <div className="App-mainContent">
        <Switch>
          <Route exact path='/' component={WriteArticle} />
          <Route exact path='/blog/' component={Blog} />
          <Route exact path='/write/' component={LandingPage} />
        </Switch>
      </div>

    </div>
  );
}

export default App;
