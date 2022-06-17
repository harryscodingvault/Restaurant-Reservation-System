import React from "react";

import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function AppRoutes() {
  return (
    <Routes>
      <Route exact={true} path="/" to="/dashboard" />
      <Route exact={true} path="/dashboard/reservations" />
      <Route path="/dashboard">
        <Route date={today()} />
      </Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default AppRoutes;
