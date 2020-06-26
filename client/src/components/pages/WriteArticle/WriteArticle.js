import React, { useState } from 'react';
import './WriteArticle.css';



function WriteArticle(props) {
  const[questionDate, setQuestionDate] = useState('');
  const [question, setQuestion] = useState('');


  function onChangeQuestion(ev) {
    setQuestion(ev.target.value);
  }
  function onChangeQuestionDate(ev) {
    setQuestionDate(ev.target.value);
  }

  function submit() {
    const formData = {
      date: questionDate,
      question: question,
    };
    // Can also be written:
    // const formData = {title, text: content};
    if (formData.length === 0) {
      
      
    } else {

    fetch('/api/mongodb/dailyquestions/', {
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
      <h1>Add a prompt</h1>
      <input
          name="Prompt date"
          placeholder="When yyyy-mm-dd is this prompt active?"
          value={questionDate}
          onChange={onChangeQuestionDate}
        />

      <br />

      <textarea
          name="Prompt"
          placeholder="What is the prompt of the day?"
          value={question}
          onChange={onChangeQuestion}
        />

      <br />

      <button onClick={submit}>Add Prompt</button>
    </div>
    


  );
}

export default WriteArticle;
