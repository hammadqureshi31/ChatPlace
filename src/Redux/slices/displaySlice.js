import { createSlice } from "@reduxjs/toolkit";

export const displaySlice = createSlice({
    name: 'display',
    initialState: false,
    reducers:{
        setChatDisplay: (state,action)=>{
            // console.log("From store",action.payload)
            return state = action.payload
        }
    }
})

export const { setChatDisplay } = displaySlice.actions; // Changed from .reducer to .actions
export default displaySlice.reducer;
