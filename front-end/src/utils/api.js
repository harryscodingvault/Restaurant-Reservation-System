import axios from "axios";

const originURL = axios.create({
  baseURL: "http://localhost:5001",
});

export const addReservation = async (data) => {
  try {
    const response = await originURL.post("/reservations", { data });
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const getAllReservations = async (date) => {
  try {
    const response = await originURL.get(`/reservations?date=${date}`);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};
