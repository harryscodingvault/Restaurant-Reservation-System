import React from "react";
import { useNavigate, NavLink } from "react-router-dom";

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */
import Wrapper from "./Menu.style";

function Menu() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <div className="title">
        <h2 onClick={() => navigate("/")}>
          <span>Periodic Tables</span>
        </h2>
      </div>
      <ul className="navbar-menu">
        <li className="nav-item">
          <NavLink
            to="/dashboard"
            style={({ isActive }) => {
              return { color: isActive ? "var(--primary-500)" : "white" };
            }}
          >
            <span className="oi oi-dashboard" />
            &nbsp;Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/search"
            style={({ isActive }) => {
              return { color: isActive ? "var(--primary-500)" : "white" };
            }}
          >
            <span className="oi oi-magnifying-glass" />
            &nbsp;Search
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/reservations/new"
            style={({ isActive }) => {
              return { color: isActive ? "var(--primary-500)" : "white" };
            }}
          >
            <span className="oi oi-plus" />
            &nbsp;New Reservation
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/tables/new"
            style={({ isActive }) => {
              return { color: isActive ? "var(--primary-500)" : "white" };
            }}
          >
            <span className="oi oi-layers" />
            &nbsp;New Table
          </NavLink>
        </li>
      </ul>
    </Wrapper>
  );
}

export default Menu;
