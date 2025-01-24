import React, { useState } from "react";
import "./Calculator.css";

const Calculator = () => {
  const [input, setInput] = useState("");

  const handleButtonClick = (value) => {
    if (value === "C") {
      setInput(""); // Clear input
    } else if (value === "⌫") {
      setInput((prev) => prev.slice(0, -1)); // Backspace functionality
    } else if (value === "=") {
      try {
        setInput(eval(input).toString()); // Safely evaluate the input
      } catch {
        setInput("Error"); // Display error message
      }
    } else if (value === "+/-") {
      try {
        
        const evaluated = eval(input) || 0; // Evaluate current input
        setInput((evaluated * -1).toString()); // Negate the value
      } catch {
        setInput("Error");
      }
    } else {
      setInput((prev) => {
        
        if (prev.length >= 20 && !["+", "-", "*", "/"].includes(value)) {
          return prev; // Prevent adding more numbers or invalid characters
        }
        return prev + value; // Append value to input
      });
    }
  };
  

  return (
    <div className="calculator">
      <div className="display">
        {input || "0"}
      </div>
      <div className="buttons">
        {[
          "C", "⌫", "%", "/",
          "7", "8", "9", "*",
          "4", "5", "6", "-",
          "1", "2", "3", "+",
          "+/-", "0", ".", "="
        ].map((btn, idx) => (
          <button key={idx} onClick={() => handleButtonClick(btn)}>
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;