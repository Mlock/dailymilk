import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';



function LandingPage(props) {
//   return (
//     <div className="LandingPage">
//       <header className="LandingPage-header">
//         <p>
//           Here's the question of the day
//         </p>
//         <div className="datePicker">
//         <Link to="/blog/">Today's Writings</Link>
//         <br />
//         <Link to="/">Write Article</Link>
//         </div>
//       </header>
//     </div>
//   );
// }
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

return (
  <div className="WriteArticle">
    <h3>June 16, 2020</h3>
    <p>What is the meaning of life?</p>

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

export default LandingPage;
