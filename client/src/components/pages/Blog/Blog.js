import React, { useState, useEffect } from "react";
import "./Blog.css";
import DailyPost from "../DailyPost/DailyPost";
import Moment from "moment";
import Truncate from "react-truncate";

function Blog() {
  const [dailyQuestions, setDailyQuestions] = useState([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  function fetchQuestions() {
    console.log("Fetching date from API");
    fetch("/api/mongodb/dailyquestions/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Got a question back", data);
        setDailyQuestions(data);
      });
  }

  function yesterdayQuestion() {
    const yestdayQuestion = dailyQuestions[dailyQuestions.length - 1];
    console.log("gettting yesterday question", yesterdayQuestion);
  }

  useEffect(fetchQuestions, []);
  useEffect(() => {
    if (dailyQuestions.length > 0) {
      const idOfFirstQuestion = dailyQuestions[0]._id;
      setSelectedQuestionId(idOfFirstQuestion);
    }
  }, [dailyQuestions]);

  const selectedQuestion = dailyQuestions.find(
    (question) => question._id === selectedQuestionId
  );
  // const today = new Date().toISOString().slice(0,10)
  const date = new Date(); // 2009-11-10
  const today = date.toLocaleString("default", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  console.log("Today is: " + today);

  return (
    <div className="Blog">
      <div className="Posts">
        <div className="DailyPrompt">{selectedQuestion && selectedQuestion.question}</div>
        <h4>{selectedQuestion && selectedQuestion.date}</h4>
        {selectedQuestion &&
          selectedQuestion.responses.map((response, index) => (
            <div className="Blog-article">
              {/* <p>POSSIBLE TO DO - GET AUTHOR NAME</p> */}
              <p>{response}</p>
            </div>
          ))}
      </div>
      <br />
      <div className="Dates">
        <h3>Previous Prompts</h3>

        {dailyQuestions
          .map(
            (post, index) =>
              post.date &&
              post.date < today && (
                <div
                  className="Blog-article"
                  key={post._id}
                  onClick={() => setSelectedQuestionId(post._id)}
                >
                  <h4>
                    <Truncate lines={5}>{post.question}</Truncate>
                  </h4>
                  <p>Posted on: {post.date}</p>
                </div>
              )
          )
          .reverse()}
      </div>
    </div>
  );
}

export default Blog;
