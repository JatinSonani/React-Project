import React, { useEffect } from "react";
import "./Counter.css";

const Counter = ({ count, increment, decrement, reset }) => {
  useEffect(() => {
    console.log("Counter component has been mounted");

    return () => {
      console.log("Counter component will unmount");
    };
  }, []);

  // Log whenever the count changes
  useEffect(() => {
    console.log(`Count has been updated: ${count}`);
  }, [count]);

  return (
    <div className="counter-container">
      <h1>Counter App</h1>
      <h3>Count: {count}</h3>
      <div className="button-group">
        <button className="counter-button" onClick={increment}>
          Increment
        </button>
        <button
          className="counter-button"
          onClick={decrement}
          disabled={count === 0}
        >
          Decrement
        </button>
        <button className="counter-button" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Counter;
