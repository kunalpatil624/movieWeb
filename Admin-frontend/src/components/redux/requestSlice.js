import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    requests:[],
    singleRequest:null,
};

const requestSlice = createSlice({
    name:"requests",
    initialState,
    reducers:{
        setRequests:(state, action) => {
            state.requests = action.payload;
        },
        setSingleRequest:(state, action)=> {
            state.singleRequest = action.payload;
        },
    },
});

export const {setRequests, setSingleRequest} = requestSlice.actions;
export default requestSlice.reducer;