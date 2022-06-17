import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */
import Wrapper from "./Menu.style";

function Menu() {
  const navigate = useNavigate();

  return (
    <Wrapper className="navbar-container">
      <div className="title">
        <h2 onClick={() => navigate("/")}>
          <span>Periodic Tables</span>
        </h2>
      </div>
      <ul className="navbar-menu">
        <li className="nav-item" onClick={() => navigate("/dashboard")}>
          <span className="oi oi-dashboard" />
          &nbsp;Dashboard
        </li>
        <li className="nav-item" onClick={() => navigate("/search")}>
          <span className="oi oi-magnifying-glass" />
          &nbsp;Search
        </li>
        <li className="nav-item" onClick={() => navigate("/reservations/new")}>
          <span className="oi oi-plus" />
          &nbsp;New Reservation
        </li>
        <li className="nav-item" onClick={() => navigate("/tables/new")}>
          <span className="oi oi-layers" />
          &nbsp;New Table
        </li>
      </ul>
    </Wrapper>
  );
}

export default Menu;
