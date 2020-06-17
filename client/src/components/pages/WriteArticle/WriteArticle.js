import React, { useState } from 'react';
import './WriteArticle.css';
import SlateWriter from '../../Slate/SlateWriter.js';

// function getDailyPrompt() {
//   console.log('getting daily prompt or qustions')
//   console.log('daily prompt is: ', prompt)
//   fetch('/api/mongodb/dailyposts/?prompt=' + prompt)
//   .then(response => response.json())
//   .then(data => {
//     console.log('this is data', data[0]);
//     if (data[0]);
//   } else {
//     setData(getDefault());
//   }
//   )};
// }


function WriteArticle(props) {
  const[userName, setUserName] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  function onChangeContent(ev) {
    setContent(ev.target.value);
  }

  function onChangeTitle(ev) {
    setTitle(ev.target.value);
  }
  function onChangeUser(ev) {
    setUserName(ev.target.value);
  }

  function submit() {
    const formData = {
      user: userName,
      title: title,
      text: content,
    };
    // Can also be written:
    // const formData = {title, text: content};
    if (formData.length === 0) {
      
      
    } else {

    fetch('/api/mongodb/blogposts/', {
      method: 'POST',
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
  }

  return (
    <div className="WriteArticle">
      <h3>June 16, 2020</h3>
      <p>What is the meaning of life?</p>
<SlateWriter />
      <h1>Add your story</h1>
      <input
          name="user name"
          placeholder="What's your name?"
          value={userName}
          onChange={onChangeUser}
        />
      <input
          name="title"
          placeholder="Title"
          value={title}
          onChange={onChangeTitle}
        />
      <br />

      <textarea
          name="content"
          placeholder="Start your story with something"
          value={content}
          onChange={onChangeContent}
        />

      <br />

      <button onClick={submit}>Add Story</button>
    </div>
    


  );
}

export default WriteArticle;
