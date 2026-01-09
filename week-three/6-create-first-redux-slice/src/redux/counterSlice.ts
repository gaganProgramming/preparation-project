// src/redux/counterSlice.ts
import { createSlice } from '@reduxjs/toolkit';

// Define the type for the counter state
interface CounterState {
    count: number;
}

// Initial state for the counter
const initialState: CounterState = {
    count: 0,
};

// Create the counter slice
const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.count += 1;
        },
        decrement: (state) => {
            state.count -= 1;
        },
        reset: (state) => {
            state.count = 0;
        },
    },
});

// Export the actions to use them in the components
export const { increment, decrement, reset } = counterSlice.actions;

// Export the reducer to be used in the store
export default counterSlice.reducer;
