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

export const getReservations = async (date) => {
  try {
    const response = await originURL.get(`/reservations?date=${date}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getReservation = async (reservationId) => {
  try {
    const response = await originURL.get(`/reservations/${reservationId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const addTable = async (table) => {
  try {
    const response = await originURL.post("/tables", { data: table });
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const getTables = async () => {
  try {
    const response = await originURL.get("/tables");
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const seatTable = async (data) => {
  const { tableId, reservationId } = data;
  try {
    const response = await originURL.put(`/tables/${tableId}/seat`, {
      data: { reservation_id: reservationId },
    });
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};
