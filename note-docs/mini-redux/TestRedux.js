
import { flushSync } from 'react-dom';
import store from '.'
import { useEffect, useRef } from 'react';

function countReducer(state, action) {
  switch (action) {
    case "ADD":
      return (state || 0) + 1  
    case "SUB":
      return (state || 0)  - 1
    default: 
      return state
  }
}

function anotherReducer(state, action) {
  switch (action) {
    case "ANOTHER":
      return action;  
    default:
      return state
  }
}

function TestRedux() {
  const labelRef = useRef();
  useEffect(() => {
    // Reducers can be thought of as behavioral definitions of state tree properties.
    store.addReducers({
      count: countReducer,
      another: anotherReducer
    })

    store.subscribe((state, prevState) => {
      console.log(state, prevState);
      labelRef.current.textContent = state.count;
    })
  }, [])


  const handleAdd = () => {
    store.dispatch('ADD');
  }

  const handleSub = () => {
    store.dispatch('SUB');
  }

  const handleAnother = () => {
    store.dispatch('ANOTHER')
  }

  return (
    <div>
      <div ref={labelRef}>0</div>
      <button onClick={handleAdd}>添加</button>
      <button onClick={handleSub}>减少</button>
      <button onClick={handleAnother}>ANOTHER</button>
    </div>
  );
}

export default TestRedux;
