import {useEffect, useState} from 'react';
import './App.css';
import {changeDocumentTitle} from "./changeDocumentTItle";
import {EvenStatus} from "./even/isEven";

export const App = () => {
  const [count, setCount] = useState(0);
  const evenStatus = EvenStatus(count);

  useEffect(() => {
      changeDocumentTitle(`You clicked ${count} times`);
  })

  return (
    <div className="App">
      <h1>Reactのサンプル</h1>
      <button onClick={() => setCount(count + 1)}>count: {count}</button>
        {evenStatus}
    </div>
  );
};
