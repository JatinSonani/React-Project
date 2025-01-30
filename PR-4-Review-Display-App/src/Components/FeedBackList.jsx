import React, { useEffect } from "react";
import "./FeedBackList.css";

const FeedBackList = ({ feedbacks, closeSidebar }) => {
  useEffect(() => {
    console.log("Received Feedbacks in Sidebar:", feedbacks); // ✅ Debugging output
  }, [feedbacks]); // Runs whenever `feedbacks` updates

  return (
    <div className="sidebar open">
      <button className="close-btn" onClick={closeSidebar}>✖</button>
      <h3>Recent Feedback</h3>
      <div className="feedback-list">
        {feedbacks.length > 0 ? (
          feedbacks.map((feedback, index) => (
            <div key={index} className="feedback-item">
              <h4>{feedback.feedbackTitle}</h4>
              <p>{feedback.feedback}</p>
              <div className="rating">Rating: {"★".repeat(feedback.rating)}</div>
            </div>
          ))
        ) : (
          <p>No feedback available</p>
        )}
      </div>
    </div>
  );
};

export default FeedBackList;
