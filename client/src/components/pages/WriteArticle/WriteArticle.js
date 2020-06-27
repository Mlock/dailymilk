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
      <h1>Submit a prompt</h1>
      <p>To write a compelling prompt, describe an open-ended scenario that's not too specific. Prompts may take a few days to be approved before they appear on the site.</p>
      {/* <input
          name="Question date"
          placeholder="What yyyy-mm-dd is this question?"
          value={questionDate}
          onChange={onChangeQuestionDate}
        />

      <br />
 */}
      <textarea
          name="question"
          placeholder=" "
          value={question}
          onChange={onChangeQuestion}
        />

      <br />

      <button onClick={submit}>Add your prompt</button>
    </div>
    


  );
}

export default WriteArticle;
