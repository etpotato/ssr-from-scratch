import React, { useState } from 'react';

export default function App({ text }) {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>React ssr test</h1>
      <p>{ text }</p>
      <p>{ count }</p>
      <button type='button' onClick={() => setCount(count => count + 1)}>increment</button>
      <button type='button' onClick={() => setCount(count => count - 1)}>decrement</button>
    </>
  );
};
