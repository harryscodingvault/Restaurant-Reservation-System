import originURL from "../../utils/axios";

export const addReservationThunk = async (url, reservation, thunkAPI) => {
  try {
    console.log("reservation", reservation);
    const response = await originURL.post(url, { data: reservation });
    console.log("response", response);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const getAllReservationThunk = async (url, thunkAPI) => {
  try {
    const response = await originURL.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
