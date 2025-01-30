import React, { useState } from "react";
import FeedBackForm from "./Components/FeedBackForm";
import FeedBackList from "./Components/FeedBackList";
import "./App.css";

const App = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  

  const addFeedback = (feedback) => {
    setFeedbacks((prevFeedbacks) => {
      const updatedFeedbacks = [...prevFeedbacks, feedback];
      console.log("Updated Feedbacks:", updatedFeedbacks); // ✅ Debugging output
      return updatedFeedbacks;
    });
    setIsSidebarOpen(true);
  };
  
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app-container">
      <FeedBackForm addFeedback={addFeedback} toggleSidebar={toggleSidebar} />
      {isSidebarOpen && <FeedBackList feedbacks={feedbacks} closeSidebar={() => setIsSidebarOpen(false)} />}

    </div>
  );
};

export default App;
