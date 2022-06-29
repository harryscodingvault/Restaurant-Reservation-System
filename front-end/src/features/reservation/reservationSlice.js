import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addReservationThunk,
  getAllReservationThunk,
  addTableThunk,
  getTablesThunk,
  seatTableThunk,
  freeTableThunk,
  changeReservationStatusThunk,
} from "./reservationThunk";

const initialState = {
  current_reservation: null,
  current_table: null,
  search_date: null,
  search_phone: null,
  reservation_list: null,
  table_list: null,
  isLoading: false,
  api_error: null,
};

export const addReservation = createAsyncThunk(
  "reservation/addReservation",
  async (reservation, thunkAPI) => {
    return addReservationThunk("/reservations", reservation, thunkAPI);
  }
);

export const changeReservationStatus = createAsyncThunk(
  "reservation/changeReservationStatus",
  async (data, thunkAPI) => {
    const { reservationId, status } = data;
    return changeReservationStatusThunk(
      `/tables/${reservationId}/seat`,
      status,
      thunkAPI
    );
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

export const getTables = createAsyncThunk(
  "reservation/getTables",
  async (_, thunkAPI) => {
    return getTablesThunk("/tables", thunkAPI);
  }
);

export const addTable = createAsyncThunk(
  "reservation/addTable",
  async (table, thunkAPI) => {
    return addTableThunk("/tables", table, thunkAPI);
  }
);

export const seatTable = createAsyncThunk(
  "reservation/seatTable",
  async (data, thunkAPI) => {
    const { table, reservation } = data;

    return seatTableThunk(
      `/tables/${table}/seat`,
      { reservation_id: reservation },
      thunkAPI
    );
  }
);

export const freeTable = createAsyncThunk(
  "reservation/freeTable",
  async (tableId, thunkAPI) => {
    return freeTableThunk(`/tables/${tableId}/seat`, thunkAPI);
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
    // CHANGE RESERVATION STATUS TABLE
    [changeReservationStatus.pending]: (state) => {
      state.isLoading = true;
    },
    [changeReservationStatus.fulfilled]: (state, { payload }) => {
      const { data } = payload;
      state.isLoading = false;
      state.api_error = null;
      state.current_reservation = data;
    },
    [changeReservationStatus.rejected]: (state, { payload }) => {
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
    // ADD TABLE
    [addTable.pending]: (state) => {
      state.isLoading = true;
    },
    [addTable.fulfilled]: (state, { payload }) => {
      const { data } = payload;
      state.isLoading = false;
      state.api_error = null;
      state.current_table = data;
    },
    [addTable.rejected]: (state, { payload }) => {
      state.isLoading = false;

      state.api_error = payload.message;
    },
    // SEAT TABLE
    [seatTable.pending]: (state) => {
      state.isLoading = true;
    },
    [seatTable.fulfilled]: (state, { payload }) => {
      const { data } = payload;
      state.isLoading = false;
      state.api_error = null;
      state.current_table = data;
    },
    [seatTable.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.api_error = payload.message;
    },
    // FREE TABLE
    [freeTable.pending]: (state) => {
      state.isLoading = true;
    },
    [freeTable.fulfilled]: (state, { payload }) => {
      const { data } = payload;
      state.isLoading = false;
      state.api_error = null;
      state.current_table = data;
    },
    [freeTable.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.api_error = payload.message;
    },
    // GET TABLES
    [getTables.pending]: (state) => {
      state.isLoading = true;
    },
    [getTables.fulfilled]: (state, { payload }) => {
      const { data } = payload;
      state.isLoading = false;
      state.table_list = data ? data : [];
    },
    [getTables.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.api_error = payload;
    },
  },
});

export const { setSearchDate } = reservationSlice.actions;
export default reservationSlice.reducer;
