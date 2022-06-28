import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addReservationThunk,
  getAllReservationThunk,
} from "./reservationThunk";

const initialState = {
  current_reservation: null,
  search_date: null,
  search_phone: null,
  reservation_list: null,
  isLoading: false,
  api_error: null,
};

console.log();

export const addReservation = createAsyncThunk(
  "reservation/addReservation",
  async (reservation, thunkAPI) => {
    return addReservationThunk("/reservations", reservation, thunkAPI);
  }
);

export const getAllReservations = createAsyncThunk(
  "reservation/getAllReservations",
  async (search_date, thunkAPI) => {
    if (search_date) {
      return getAllReservationThunk(
        `/reservations?date=${search_date}`,
        thunkAPI
      );
    }
    return getAllReservationThunk("/reservations", thunkAPI);
  }
);

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    setSearchDate: (state, { payload }) => {
      state.search_date = payload;
    },
  },
  extraReducers: {
    // ADD RESERVATION
    [addReservation.pending]: (state) => {
      state.isLoading = true;
    },
    [addReservation.fulfilled]: (state, { payload }) => {
      const { data } = payload;
      state.isLoading = false;
      state.api_error = null;
      state.current_reservation = data;
    },
    [addReservation.rejected]: (state, { payload }) => {
      state.isLoading = false;

      state.api_error = payload.message;
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

      state.api_error = payload;
    },
  },
});

export const { setSearchDate } = reservationSlice.actions;
export default reservationSlice.reducer;
