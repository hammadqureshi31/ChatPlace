import { createSlice } from "@reduxjs/toolkit";

export const LatestUserId = createSlice({
    name: 'latestUser',
    initialState:'',
    reducers:{
        setLatestUserId: (state,action)=>{
            // console.log("latest id",action.payload)
            return state = action.payload
        } 
    }
})

export const { setLatestUserId } = LatestUserId.actions;
export default LatestUserId.reducer;