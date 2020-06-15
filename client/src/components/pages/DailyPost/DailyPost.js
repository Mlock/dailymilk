import React, { useState, useEffect } from 'react';
import './DailyPost.css';

function DailyPost() {
  const [dailyPosts, setDailyPosts] = useState([]);


  function fetchPosts() {
    console.log('Fetching data from API');
    fetch('/api/mongodb/dailyposts/')
      .then(response => response.json())
      .then(data => {
        console.log('Got data back', data);
        setDailyPosts(data);
      });
  }

  function previousPost() {
    console.log('Fetching data from API');
    fetch('/api/mongodb/dailyposts/')
      .then(response => response.json())
      .then(data => {
        console.log('Got Data back'. data);

      })
  }

  function deleteArticle(documentId) {
    console.log('Sending DELETE for', documentId);
    // Do the DELETE, using "?_id=" to specify which document we are deleting
    fetch('/api/mongodb/dateposts/?_id=' + documentId, {
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
    fetch('/api/mongodb/dailyposts/?_id=' + documentId, {
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

  return (
    <div className="DailyPost">
      <h1>Daily Post</h1>
      {
        dailyPosts.map((post, index) => (
          <div className="DailyPost-article" key={post._id}>
          

            <h1>{post.title}</h1>
            <h3>Written by {post.user}</h3>
            <p>{post.text}</p>

            <div className="DailyPost-articleActions">
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
    </div>
  );
}

export default DailyPost;
