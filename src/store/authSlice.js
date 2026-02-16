 import { createSlice } from "@reduxjs/toolkit";
// initial state for authentication

const initialState = {
    // user data is null when not authenticated
    userData: null,
    status: false,

};

const authSlice = createSlice({
    // name of the slice
    name: "auth",
    initialState,// initial state
    reducers: {    /// reducers to handle login and logout actions
        userLogin(state, action) {
            state.status = true;
            state.userData = action.payload;
            
        },
        userLogout(state) {
            state.status = false;
            state.userData = null;
            
        },

    }
})
// export the actions and reducer for use in the application

export const { userLogin, userLogout } = authSlice.actions;


export default authSlice.reducer; // export the reducer to be used in the store