import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

function fetchDailyPrompt() {
  console.log('TODO: Fetch daily prompt from API');
  fetch('/something/')
    .then(response => response.json())
    .then(data => {
      console.log('fetch successful!', data)
    });

}
function LandingPage() {
  return (
    <div className="LandingPage">
      <header className="LandingPage-header">
        <p>
          there's should be something here
        </p>
        <Link to="/blog/">Today's Writings</Link>
        <Link to="/write/">Write Article</Link>
      </header>
    </div>
  );
}

export default LandingPage;
