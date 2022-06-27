import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addReservationThunk,
  getAllReservationThunk,
} from "./reservationThunk";

const initialState = {
  current_reservation: null,
  reservation_list: null,
  isLoading: false,
  api_error: null,
};

export const addReservation = createAsyncThunk(
  "reservation/addReservation",
  async (reservation, thunkAPI) => {
    return addReservationThunk("/reservations", reservation, thunkAPI);
  }
);

export const getAllReservations = createAsyncThunk(
  "reservation/getAllReservations",
  async (date, thunkAPI) => {
    if (date) {
      return getAllReservationThunk(`/reservations?date=${date}`, thunkAPI);
    }
    return getAllReservationThunk("/reservations", thunkAPI);
  }
);

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  extraReducers: {
    // ADD RESERVATION
    [addReservation.pending]: (state) => {
      state.isLoading = true;
    },
    [addReservation.fulfilled]: (state, { payload }) => {
      const { data } = payload;
      state.isLoading = false;
      state.current_reservation = data;
    },
    [addReservation.rejected]: (state, { payload }) => {
      state.isLoading = false;

      state.api_error = payload;
    },
    // GET ALL RESERVATIONS
    [getAllReservations.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllReservations.fulfilled]: (state, { payload }) => {
      const { data } = payload;
      state.isLoading = false;
      state.reservation_list = data ? data : [];
    },
    [getAllReservations.rejected]: (state, { payload }) => {
      state.isLoading = false;
      console.log("error", payload);
      state.api_error = payload;
    },
  },
});

export default reservationSlice.reducer;
