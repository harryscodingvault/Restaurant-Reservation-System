import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import NotFound from "./layout/NotFound";
import AddReservation from "./pages/addReservation/AddReservation";
import AddTable from "./pages/addTable/AddTable";
import Tables from "./pages/tables/Tables";

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
          <Route path=":reservationId/seat" element={<Tables />} />
        </Route>
        <Route path="tables" exact>
          <Route path="new" element={<AddTable />} />
        </Route>
        <Route path="*" element={<NotFound />} exact />
      </Route>
    </Routes>
  );
}

export default App;
