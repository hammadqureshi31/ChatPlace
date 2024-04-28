import { createSlice } from "@reduxjs/toolkit";

export const fetchChatList = createSlice({
    name: 'fetchChatList',
    initialState: false,
    reducers:{
        setFetchChatList: (state,action)=>{
            return state = action.payload;
        }
    }
}) 

export const { setFetchChatList } = fetchChatList.actions;
export default fetchChatList.reducer;