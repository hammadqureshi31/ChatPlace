import { createSlice } from "@reduxjs/toolkit";

export const signupSlice = createSlice({
    name: 'signup',
    initialState: false,
    reducers:{
        setSignupPage: (state,action)=>{
            console.log(action.payload)
            return state = action.payload
        }
    }
})

export const { setSignupPage } = signupSlice.actions
export default signupSlice.reducer;