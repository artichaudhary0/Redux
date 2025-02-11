import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isAuthenticate: false,
        error: null,
        isSignupSuccess: false,
        registerUsers: [], // Stores registered users
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.isAuthenticate = true;
            state.error = null;
            state.isSignupSuccess = false;
        },

        loginFailure: (state, action) => {
            state.user = null;
            state.isAuthenticate = false;
            state.error = action.payload;
            state.isSignupSuccess = false;
        },

        signupSuccess: (state, action) => {
            state.user = null;
            state.isAuthenticate = false;
            state.registerUsers.push(action.payload);
            state.isSignupSuccess = true;
            state.error = null;
        },

        signupFailure: (state, action) => {
            state.user = null;
            state.isAuthenticate = false;
            state.isSignupSuccess = false;
            state.error = action.payload;
        },

        logout: (state) => {
            state.user = null;
            state.isAuthenticate = false;
            state.error = null;
            state.isSignupSuccess = false;
        },
    },
});

export const { loginSuccess, loginFailure, signupSuccess, signupFailure, logout } = authSlice.actions;
export default authSlice.reducer;
