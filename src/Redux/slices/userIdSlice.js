import { createSlice } from "@reduxjs/toolkit";

export const userIdSlice = createSlice({
    name: 'userID',
    initialState: [],
    reducers: {
        setUserId: (state, action) => {
            return [action.payload]; 
        }
    }
});

export const { setUserId } = userIdSlice.actions;
export default userIdSlice.reducer;
