import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    myBookings: [],
    searchBookingByText: "" // ✅ default value set kiya
};

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        setMyBookings: (state, action) => {
            state.myBookings = action.payload;
        },
        setSearchBookingByText: (state, action) => {
            state.searchBookingByText = action.payload;
        }
    }
});

// ✅ correct actions export
export const { setMyBookings, setSearchBookingByText } = bookingSlice.actions;

export default bookingSlice.reducer;
