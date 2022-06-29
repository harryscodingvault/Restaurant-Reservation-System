import originURL from "../../utils/axios";

export const addReservationThunk = async (url, reservation, thunkAPI) => {
  try {
    const response = await originURL.post(url, { data: reservation });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const getAllReservationThunk = async (url, status, thunkAPI) => {
  try {
    const response = await originURL.get(url, { data: status });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const changeReservationStatusThunk = async (url, thunkAPI) => {
  try {
    const response = await originURL.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const addTableThunk = async (url, table, thunkAPI) => {
  try {
    const response = await originURL.post(url, { data: table });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const seatTableThunk = async (url, reservation, thunkAPI) => {
  try {
    const response = await originURL.put(url, { data: reservation });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const freeTableThunk = async (url, thunkAPI) => {
  try {
    const response = await originURL.delete(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const getTablesThunk = async (url, thunkAPI) => {
  try {
    const response = await originURL.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};
