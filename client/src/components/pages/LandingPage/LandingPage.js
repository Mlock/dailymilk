import React, { useState, useEffect } from "react";
import "./LandingPage.css";

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
      {/* <h1>Today's prompt <span className='spanDate'>- {cleanDate}</span></h1> */}
      <span className="LandingPage-PromptHeader">
        <h3>Today's prompt {cleanDate}</h3>
      </span>
      <div className="LandingPage-DailyPrompt">{prompt && prompt.question}</div>
      <p className="LandingPage-StoryHeader">Add your story</p>

      <textarea
        name="content"
        placeholder="Don't think, just write"
        value={content}
        onChange={onChangeContent}
      />
<<<<<<< HEAD
    <br />

    <button onClick={submit}>Submit your story</button>
  </div>
  


);
=======
      <br />
      <p>Add your name</p>
      <div className="LandingPage-input">
        <input
          name="user name"
          placeholder=""
          value={userName}
          onChange={onChangeUser}
        />
      </div>

      <br />

      <button onClick={submit}>Submit your story</button>
    </div>
  );
>>>>>>> bd708d3b09a7c53b1f6c790d5ad9e8aecf364c4a
}

export default LandingPage;
