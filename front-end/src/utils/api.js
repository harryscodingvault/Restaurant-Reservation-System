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

export const getAllReservations = async () => {
  try {
    const response = await originURL.get("/reservations");
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};
