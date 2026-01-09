// src/App.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, reset } from './redux/counterSlice';
import type {RootState, AppDispatch } from './redux/store.ts';

const App: React.FC = () => {
    // Access the counter state from Redux
    const count = useSelector((state: RootState) => state.counter.count);

    // Access the dispatch function
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className="App">
            <h1>Counter: {count}</h1>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
            <button onClick={() => dispatch(reset())}>Reset</button>
        </div>
    );
};

export default App;
// how to use actions in reducer and how to use actions in components.