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

export const getReservations = async ({ date, phone }) => {
  try {
    if (date) {
      const response = await originURL.get(`/reservations?date=${date}`);
      return response.data;
    }
    if (phone) {
      const response = await originURL.get(
        `/reservations?mobile_number=${phone}`
      );
      return response.data;
    }
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

export const freeTable = async (tableId) => {
  try {
    const response = await originURL.delete(`/tables/${tableId}/seat`);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};
