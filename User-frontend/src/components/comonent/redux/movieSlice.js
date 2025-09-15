import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movies:[], 
    singleMovie:null,
    searchMovieByText:"",
}
const movieSlice = createSlice({
    name:"movie",
    initialState,
    reducers:{
        setMovies:(state, action) => {
            state.movies = action.payload;
        },
        setSingleMovie:(state, action)=> {
            state.singleMovie = action.payload;
        },
        setSearchMovieByText:(state, action) => {
            state.searchMovieByText = action.payload;
        }
    },
});

export const { setMovies, setSearchMovieByText, setSingleMovie } = movieSlice.actions;
export default movieSlice.reducer;