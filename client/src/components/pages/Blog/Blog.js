import React, { useState, useEffect } from 'react';
import './Blog.css';

function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [dailyQuestions, setDailyQuestions] = useState([]);

  function fetchQuestions() {
    console.log('Fetching date from API');
    fetch('/api/mongodb/dailyquestions/')
      .then(response => response.json())
      .then(data => {
        console.log('Got a question back', data);
        setDailyQuestions(data);
      })
  }

  function fetchPosts() {
    console.log('Fetching data from API');
    fetch('/api/mongodb/blogposts/')
      .then(response => response.json())
      .then(data => {
        console.log('Got data back', data);
        setBlogPosts(data);
      });
  }

  function deleteArticle(documentId) {
    console.log('Sending DELETE for', documentId);
    // Do the DELETE, using "?_id=" to specify which document we are deleting
    fetch('/api/mongodb/blogposts/?_id=' + documentId, {
        method: 'DELETE',
      })
      .then(response => response.json())
      .then(data => {
        console.log('Got this back', data);

        // Call method to refresh data
        fetchPosts();
      });
  }

  function voteArticle(article) {
    let newVoteCount = article.voteCount;

    // Increase the vote count 
    if (!newVoteCount) {
      newVoteCount = 1;
    } else {
      newVoteCount++;
    }

    const formData = {
      voteCount: newVoteCount,
    };

    // Do the PUT, using "?_id=" to specify which document we are affecting
    const documentId = article._id;
    fetch('/api/mongodb/blogposts/?_id=' + documentId, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Got this back', data);

        // Call method to refresh data
        fetchPosts();
      });
  }

  // Invoke fetchPosts on initial load
  useEffect(fetchPosts, []);
  useEffect(fetchQuestions, []);

  return (
    <div className="Blog">
        <div className="Dates">
      <h1>Select a date</h1>
      {
        dailyQuestions.map((post, index) => (
          <div className="Blog-article" key={post._id}>

            <h1>{post.date}</h1>
            <p>{post.question}</p>

            <div className="Blog-articleActions">
              <div onClick={() => deleteArticle(post._id)}>
                <span alt="delete this">🗑</span>
              </div>
              <div onClick={() => voteArticle(post)}>
                <span alt="submissions">23 Stories</span>
              </div>
            </div>
          </div>
        ))
      }

      </div>
      <br />
      <h1>Daily Post</h1>
      {
        blogPosts.map((post, index) => (
          <div className="Blog-article" key={post._id}>

            <h1>{post.title}</h1>
            <h3>By {post.user}</h3>
            <p>{post.text}</p>

            <div className="Blog-articleActions">
              <div onClick={() => deleteArticle(post._id)}>
                <span alt="delete this">🗑</span>
              </div>
              <div onClick={() => voteArticle(post)}>
                <span alt="upvote this">⬆ {post.voteCount}</span>
              </div>
            </div>
          </div>
        ))
      }
       <div className="Dates">
      </div>
    </div>
   
  );
}

export default Blog;
