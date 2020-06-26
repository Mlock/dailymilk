import React, { useState, useEffect } from 'react';
import './Blog.css';
import DailyPost from '../DailyPost/DailyPost';
import Moment from 'moment';

function Blog() {
  const [dailyQuestions, setDailyQuestions] = useState([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  function fetchQuestions() {
    console.log('Fetching date from API');
    fetch('/api/mongodb/dailyquestions/')
      .then(response => response.json())
      .then(data => {
        console.log('Got a question back', data);
        setDailyQuestions(data);
      })
  }

  // function voteArticle(article) {
  //   let newVoteCount = article.voteCount;

  //   // Increase the vote count 
  //   if (!newVoteCount) {
  //     newVoteCount = 1;
  //   } else {
  //     newVoteCount++;
  //   }

  //   const formData = {
  //     voteCount: newVoteCount,
  //   };

  //   // Do the PUT, using "?_id=" to specify which document we are affecting
  //   const documentId = article._id;
  //   fetch('/api/mongodb/blogposts/?_id=' + documentId, {
  //       method: 'PUT',
  //       headers: {'Content-Type': 'application/json'},
  //       body: JSON.stringify(formData),
  //     })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log('Got this back', data);

  //       // Call method to refresh data
  //       fetchPosts();
  //     });
  // }

  useEffect(fetchQuestions, []);
  useEffect(() => {
    if (dailyQuestions.length > 0) {
      const idOfFirstQuestion = dailyQuestions[0]._id
      setSelectedQuestionId(idOfFirstQuestion)
    }
  }, [dailyQuestions]);


  const selectedQuestion = dailyQuestions.find(question => question._id === selectedQuestionId)

  return (
    <div className="Blog">
         <div className="Posts">
      <h1>{selectedQuestion && selectedQuestion.question}</h1>
      {/* <h1>{selectedQuestion && selectedQuestion.userName}</h1> */}
      {/* <div className="Blog-article">
        <h3>{selectedQuestion && selectedQuestion.question}</h3>
        <h4>{selectedQuestion && selectedQuestion.date}</h4>
        <p>{selectedQuestion && selectedQuestion.question}</p>
      </div> */}
      {
        selectedQuestion && selectedQuestion.responses.map((response, index) => (
          <div className="Blog-article" >

            {/* <p>POSSIBLE TO DO - GET AUTHOR NAME</p> */}
            <p>{response}</p>

            {/* <div className="Blog-articleActions">
              <div onClick={() => voteArticle(response)}>
                <span alt="upvote this">⬆ {response.voteCount}</span>
              </div>
            </div> */}
          </div>
          
        ))
      }
      </div>
      <br />
        <div className="Dates">
      <h2>Previous Prompts</h2>
      {/* If card is selected background color == grey
      else 
      nothing */}
      {
        dailyQuestions.map((post, index) => (
          <div className="Blog-article" key={post._id} onClick={() => setSelectedQuestionId(post._id)}>

            <h3>{post.question}</h3>
            <p>Posted on: {post.date}</p>

          </div>
        ))
      }

      </div>

    
    </div>
   
  );
}

export default Blog;
