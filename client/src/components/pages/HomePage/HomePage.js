import React, { useState, useEffect } from 'react';
import './HomePage.css';
import Button from '../../Button/Button.js'
import { Link } from 'react-router-dom';


function LandingPage(props) {
const [userName, setUserName] = useState('');
const [content, setContent] = useState('');
const [prompts, setPrompts] = useState([]);

function onChangeContent(ev) {
  setContent(ev.target.value);
}

function onChangeUser(ev) {
  setUserName(ev.target.value);
}

function todaysPrompt(){
  return prompts.find(prompt => prompt.date === todaysDateString())
}

function todaysDateString() {
  const today = new Date()
  const todayString = today.toLocaleString('default', {year: 'numeric', month: '2-digit',day: '2-digit'});
  
  return todayString.slice(0,10)
}

const date = new Date();  // 2009-11-10
const cleanDate = date.toLocaleString('default', {year: 'numeric', month: '2-digit',day: '2-digit'});
console.log(cleanDate);


function submit() {
  const formData = {
    // user: userName,
    text: content,
  };

  // Can also be written:
  // const formData = {title, text: content};

  fetch('/api/dailyquestions/add-response/?_id=' + todaysPrompt()._id, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Got this back', data);

      // Redirect to blog
      props.history.push('/blog/');
    });
    }

  function fetchPrompts() {
    console.log('Fetching date from API');
    fetch('/api/mongodb/dailyquestions/')
      .then(response => response.json())
      .then(data => {
        console.log('Got a question back', data);
        window.myData = data;
        setPrompts(data);
      });
    }
      
  useEffect(fetchPrompts, []);



const prompt = todaysPrompt()

return (
  <div className="WriteArticle">
    <h1 className="Hero">Love to <br />write?</h1>
    <p>Do you love to write?  Do you want to become a better writer?  Do you often not know what to write about?  Well, you've come to the right place!</p>

    <p>Here, at Daily Milk we provide you with a new writing prompt every day that will get your creative juices flowing.  Simply write your own story, based of the daily prompt and satiate your writing craving.  Come back every day for a new prompt and to read all the responses from yesterday's prompt.</p>
    <Link to="/dailyprompt">
  <Button type="primary">Start Writing</Button></Link>
  </div>
  


);
}

export default LandingPage;
