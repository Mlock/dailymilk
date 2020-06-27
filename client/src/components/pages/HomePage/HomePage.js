
import React, { useState, useEffect } from 'react';
import './HomePage.css';
import Button from '../../Button/Button.js'
import { Link } from 'react-router-dom';
import daily from '../../../img/daily.jpg';
import community from '../../../img/community.jpg';
import inspire from '../../../img/inspire.jpg';

function LandingPage(props) {
  const [userName, setUserName] = useState("");
  const [content, setContent] = useState("");
  const [prompts, setPrompts] = useState([]);

  function onChangeContent(ev) {
    setContent(ev.target.value);
  }

  function onChangeUser(ev) {
    setUserName(ev.target.value);
  }

  function todaysPrompt() {
    return prompts.find((prompt) => prompt.date === todaysDateString());
  }

  function todaysDateString() {
    const today = new Date();
    const todayString = today.toLocaleString("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    return todayString.slice(0, 10);
  }

  const date = new Date(); // 2009-11-10
  const cleanDate = date.toLocaleString("default", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  console.log(cleanDate);

  function submit() {
    const formData = {
      // user: userName,
      text: content,
    };

    // Can also be written:
    // const formData = {title, text: content};

    fetch("/api/dailyquestions/add-response/?_id=" + todaysPrompt()._id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Got this back", data);

        // Redirect to blog
        props.history.push("/blog/");
      });
  }

  function fetchPrompts() {
    console.log("Fetching date from API");
    fetch("/api/mongodb/dailyquestions/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Got a question back", data);
        window.myData = data;
        setPrompts(data);
      });
  }

  useEffect(fetchPrompts, []);


  const prompt = todaysPrompt();

  return (
    <div className="WriteArticle">
      <h1>Inspiration found</h1>

      <p>A good story is like fire, it takes a spark to get started. </p>
      <img className="HomePage-image" src={daily} />
      <img className="HomePage-image" src={community} />
      <img className="HomePage-image" src={inspire} />
      <p>At Daily Milk, you'll find a new writing prompt every day to kickstart
        your writing process. Once you've shared your story, you can browse the
        stories of other writers in the Daily Milk community.
      </p>
      <a href="/dailyprompt">Get started</a>
    </div>
  );
}

export default LandingPage;
