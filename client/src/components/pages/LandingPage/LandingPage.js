import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';



function LandingPage(props) {
const [userName, setUserName] = useState('');
const [title, setTitle] = useState('');
const [content, setContent] = useState('');
const [todaysQuestions, setTodaysQuestions] = useState([]);



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

  function fetchTodaysQuestions() {
    console.log('Fetching date from API');
    fetch('/api/mongodb/dailyquestions/')
      .then(response => response.json())
      .then(data => {
        console.log('Got a question back', data);
        setTodaysQuestions(data);
      })
  }




// app.put('/api/custom/add-response/', (request, response) => {
//   const blogposts = request.params.blogposts;
//   const data = request.body;
//   const query = request.query;

//   if (query._id) {
//     query._id = ObjectId(query._id);
//   }

//   db.collection('dailyquestions')
//   .updateOne(query, {$push: data}, (err, results) => {
//     if (err) throw err;

//     if (results.result.nModified === 1) {
//       response.json({
//         success: true,
//       });
//     } else {
//       response.json({
//         success: false,
//       });
//     }
//     });
// });

}

return (
  <div className="WriteArticle">
    <h1>Daily Question</h1>
    <div className="DailyQuestion">
    <h3>{todaysQuestions.date}</h3>
      <p>{todaysQuestions.question}</p>
    </div>
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
