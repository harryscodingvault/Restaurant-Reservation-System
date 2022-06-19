import { configureStore } from "@reduxjs/toolkit";
import reservationSlice from "./features/reservation/reservationSlice";

export const store = configureStore({
  reducer: {
    reservation: reservationSlice,
  },
});
