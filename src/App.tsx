import {useEffect, useState} from 'react';
import './App.css';
import {changeDocumentTitle} from "./changeDocumentTItle";
import {EvenStatus} from "./even/isEven";
import {getEraYear} from "./nengo/getEraYear";

import {useDispatch, useSelector} from "react-redux";
import {decrease, increase} from "./redux/counterSlice";


import {getUsers} from "./redux/userSlice";

export const App = () => {
    const [count, setCount] = useState(1900);
    const eraYear = getEraYear(count);
    const evenStatus = EvenStatus(count);
    const dispatch = useDispatch();

    useEffect(() => {
        changeDocumentTitle(`You clicked ${count} times`);
    })
    const userId = useSelector((state) => state.counter.count);

    const { users } = useSelector((state) => state.users);
    useEffect(()=> {
        dispatch(getUsers(userId));
    },[userId])

    return (
      <div className="App">
        <h1>Reactのサンプル : { count }</h1>
          <div>
              <button onClick={() => setCount(count + 1)}> + </button>
              <button onClick={() => setCount(count - 1)}> - </button>
          </div>

          { evenStatus }
          { eraYear }

        <h1> Storeのサンプル : { userId }</h1>
          <div>

              <button onClick={() => dispatch(increase())}> + </button>
              <button onClick={() => dispatch(decrease())}> - </button>
          </div>

          <h1> Storeの非同期通信サンプル : { userId }</h1>
          <div>
              { users && users.id } { users && users.name }
          </div>
      </div>
    );
};
