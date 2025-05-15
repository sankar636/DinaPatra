import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('reduxState');
        return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (error) {
        console.error('Error loading state:', error);
        return undefined;
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('reduxState', serializedState);
    } catch (error) {
        console.error('Error saving state:', error);
    }
};

const preloadedState = loadState();

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    preloadedState,
});

store.subscribe(() => {
    saveState({
        auth: store.getState().auth, // Persist auth state
    });
});

export default store;