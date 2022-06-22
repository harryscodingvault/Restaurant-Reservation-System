import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addReservationThunk } from "./reservationThunk";

const initialState = {
  reservation: null,
  isLoading: false,
  api_error: null,
};

export const addReservation = createAsyncThunk(
  "reservation/addReservation",
  async (reservation, thunkAPI) => {
    return addReservationThunk("/reservations", reservation, thunkAPI);
  }
);

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  extraReducers: {
    [addReservation.pending]: (state) => {
      state.isLoading = true;
    },
    [addReservation.fulfilled]: (state, { payload }) => {
      const { reservation } = payload;
      state.isLoading = false;
      state.reservation = reservation;
    },
    [addReservation.rejected]: (state, { payload }) => {
      state.isLoading = false;
      console.log("error", payload);
      state.api_error = payload;
    },
  },
});

export default reservationSlice.reducer;
