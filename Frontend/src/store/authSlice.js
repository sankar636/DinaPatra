import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    status: false,
    currentUser: null,
    loading: null,
    error: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signInInitial: (state) => {
            state.loading = true
            state.error = null
        },
        signIn: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.status = true;
            state.error = null;
            localStorage.setItem('currentUser', JSON.stringify(action.payload)); // Persist currentUser
        },
        signInFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        signOut: (state) => {
            state.currentUser = null
            state.error = null
            state.loading = false
            state.status = false; // Ensure status reflects logged-out state
            localStorage.removeItem('currentUser'); // Clear persisted currentUser
        }

    }
})

export const { signInInitial, signIn, signInFailure, signOut } = authSlice.actions

export default authSlice.reducer


