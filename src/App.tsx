import {useEffect, useState} from 'react';
import './App.css';
import {changeDocumentTitle} from "./changeDocumentTItle";
import {EvenStatus} from "./even/isEven";
import {getEraYear} from "./nengo/getEraYear";

export const App = () => {
  const [count, setCount] = useState(1900);
  const eraYear = getEraYear(count);
  const evenStatus = EvenStatus(count);

  useEffect(() => {
      changeDocumentTitle(`You clicked ${count} times`);
  })

  return (
    <div className="App">
      <h1>Reactのサンプル</h1>
      <button onClick={() => setCount(count + 1)}>count: {count}</button>
        { evenStatus }
        { eraYear }
    </div>
  );

};
