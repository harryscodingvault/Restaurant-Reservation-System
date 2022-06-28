import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import NotFound from "./layout/NotFound";
import AddReservation from "./pages/addReservation/AddReservation";

/**
 * Defines the root application component.
 * @returns {JSX.Element}
 */

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} exact />
        <Route path="reservations" exact>
          <Route path="new" element={<AddReservation />} />
        </Route>
        <Route path="*" element={<NotFound />} exact />
      </Route>
    </Routes>
  );
}

export default App;
