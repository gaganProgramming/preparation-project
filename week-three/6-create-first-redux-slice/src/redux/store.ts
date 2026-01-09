// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

// Configure the store
const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
});

// Export the store
export default store;

// Types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
