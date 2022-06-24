import originURL from "../../utils/axios";

export const addReservationThunk = async (url, reservation, thunkAPI) => {
  try {
    console.log("reservation", reservation);
    const response = await originURL.post(url, reservation);
    console.log("response", response);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
