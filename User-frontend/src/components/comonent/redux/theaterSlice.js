import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theaters:[],
    singleTheater:null,
    searchTheaterByText:"",
};

const theaterSlice = createSlice({
    name:"theater",
    initialState,
    reducers:{
        setTheaters:(state, action) => {
            state.theaters = action.payload
        },
        setSingleTheater:(state, action) => {
            state.singleTheater = action.payload
        },
        setSearchTheaterByText:(state, action) => {
            state.searchTheaterByText = action.payload
        }
    },
});

export const {setTheaters, setSingleTheater, setSearchTheaterByText} = theaterSlice.actions;
export default theaterSlice.reducer;