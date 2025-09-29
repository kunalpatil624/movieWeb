import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    myBookings: [],
    allBookings:[],
    searchBookingByText: "" // ✅ default value set kiya
};

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        setMyBookings: (state, action) => {
            state.myBookings = action.payload;
        },
        setAllBookings: (state, action) => {
            state.allBookings = action.payload;
        },
        setSearchBookingByText: (state, action) => {
            state.searchBookingByText = action.payload;
        }
    }
});

// ✅ correct actions export
export const { setMyBookings, setSearchBookingByText, setAllBookings } = bookingSlice.actions;

export default bookingSlice.reducer;
