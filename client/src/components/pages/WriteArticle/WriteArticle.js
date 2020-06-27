import React, { useState } from 'react';
import './WriteArticle.css';
import Button from "../../Button/Button";



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
      props.history.push('/archive/');
      });
    }
  }

  return (
    <div className="WriteArticle">
      <h1>Submit a prompt</h1>
      <p>To write a compelling prompt, describe an open-ended scenario that's not too specific. Prompts may take a few days to be approved before they appear on the site.</p>
      <textarea
          name="question"
          placeholder="It was a dark and stormy night..."
          value={question}
          onChange={onChangeQuestion}
        />

      <br />
      <Button onClick={submit} type="primary">Add your prompt</Button>
    </div>
    


  );
}

export default WriteArticle;
