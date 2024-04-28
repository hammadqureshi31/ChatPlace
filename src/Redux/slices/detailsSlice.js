import { createSlice } from "@reduxjs/toolkit";

export const detailsSlice = createSlice({
    name: 'details',
    initialState: false,
    reducers:{
        setDetailsPage:(state,action)=>{
            console.log("from slice",action.payload)
            return state = action.payload
        }
    }
})

export const {setDetailsPage} = detailsSlice.actions;
export default detailsSlice.reducer;
