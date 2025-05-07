import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    status: false,
    currentUser: null,
    loading: null
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
            state.currentUser = action.payload
            state.loading = false
            state.error = null
        },
        signInFailure: (state) => {
            state.loading = false
            state.error = action.payload
        },
        signOut: (state) => {
            state.currentUser = null
            state.error = null
            state.loading = false
        }

    }
})

export const { signInInitial, signIn, signInFailure, signOut } = authSlice.actions

export default authSlice.reducer


