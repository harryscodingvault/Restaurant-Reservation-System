import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import originURL from "../../utils/axios";

const initialState = {
  reservation: null,
  isLoading: false,
  api_error: null,
};

export const addReservation = createAsyncThunk(
  "reservation/addReservation",
  async (reservation, thunkAPI) => {
    try {
      const response = await originURL.post("/reservations", reservation);
      console.log(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
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
      console.log(payload);
      state.api_error = payload;
    },
  },
});

export default reservationSlice.reducer;
