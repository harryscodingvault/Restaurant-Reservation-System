import originURL from "../../utils/axios";

export const addReservationThunk = async (url, reservation, thunkAPI) => {
  try {
    const response = await originURL.post(url, { data: reservation });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
};

export const getAllReservationThunk = async (url, thunkAPI) => {
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
