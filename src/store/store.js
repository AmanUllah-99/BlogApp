 import { configureStore } from "@reduxjs/toolkit";
import reducer from "./authSlice";
// configure the Redux store with the auth reducer



const store = configureStore({
    // add the auth reducer to the store
    reducer : { auth: reducer } 
})        
    
     

 

export default store