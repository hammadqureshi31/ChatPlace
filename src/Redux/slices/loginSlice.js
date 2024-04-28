import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: 'login',
    initialState: false,
    reducers:{
        setLoginPage: (state,action)=>{
            console.log(action.payload)
            return state = action.payload
        }
    }
})

export const { setLoginPage }  = loginSlice.actions
export default loginSlice.reducer;