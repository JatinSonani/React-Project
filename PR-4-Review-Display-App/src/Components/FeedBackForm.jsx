import React, { useState } from "react";
import "./FeedBackForm.css";

const FeedBackForm = ({ addFeedback, toggleSidebar }) => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    companyName: "",
    feedbackTitle: "",
    feedback: "",
    rating: 0,
    agreeToPrivacy: false,
  });
  const [errors, setErrors] = useState({});
  const [charCount, setCharCount] = useState(0);

  const validate = () => {
    let errors = {};
    if (!form.fullName.trim()) errors.fullName = "Full Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errors.email = "Valid email is required";
    if (!form.companyName.trim()) errors.companyName = "Company Name is required";
    if (!form.feedbackTitle.trim()) errors.feedbackTitle = "Feedback Title is required";
    if (!form.feedback.trim()) errors.feedback = "Feedback text is required";
    if (form.rating === 0) errors.rating = "Rating is required";
    if (!form.agreeToPrivacy) errors.agreeToPrivacy = "You must agree to the Privacy Policy";
    return errors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    if (name === "feedback") setCharCount(value.length);
  };

  const handleRatingChange = (rating) => {
    setForm({ ...form, rating });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      addFeedback(form);
      setForm({
        fullName: "",
        email: "",
        companyName: "",
        feedbackTitle: "",
        feedback: "",
        rating: 0,
        agreeToPrivacy: false,
      });
      setCharCount(0);
      setErrors({});
      setTimeout(() => {
        toggleSidebar(); // Delay to ensure the state updates smoothly
      }, 100);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="feedback-container">
      <h2>Share Your Experience</h2>
      <p >We value your feedback. Let us know how we did!</p>

      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="input-group">
          <input type="text" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" />
          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Your Email" />
        </div>

        <div className="input-group">
          <input type="text" name="companyName" value={form.companyName} onChange={handleChange} placeholder="Company Name" />
          <input type="text" name="feedbackTitle" value={form.feedbackTitle} onChange={handleChange} placeholder="Feedback Title" />
        </div>

        <div className="rating-group">
          <label>Your Rating:</label>
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} onClick={() => handleRatingChange(star)} className={`star ${form.rating >= star ? "selected" : ""}`}>
                ★
              </span>
            ))}
          </div>
        </div>

        <textarea name="feedback" value={form.feedback} onChange={handleChange} placeholder="Write Feedback (Max 250 characters)" maxLength="250"></textarea>
        <p className="char-count">{charCount}/250</p>

        <div className="privacy-check">
          <input type="checkbox" name="agreeToPrivacy" checked={form.agreeToPrivacy} onChange={handleChange} />
          <label>We care about your data. Read our <a href="#">Privacy Policy</a>.</label>
        </div>

        <button type="submit" className="submit-btn">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedBackForm;
