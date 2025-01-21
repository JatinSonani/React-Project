import React, { useState } from "react";
import Counter from "./Components/Counter.jsx";

const App = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div>
      <Counter
        count={count}
        increment={increment}
        decrement={decrement}
        reset={reset}
      />
    </div>
  );
};

export default App;
