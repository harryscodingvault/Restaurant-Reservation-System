import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  first_name: "",
  last_name: "",
  mobile_number: "",
  reservation_date: "",
  reservation_time: "",
};

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
});

export default reservationSlice.reducer;
