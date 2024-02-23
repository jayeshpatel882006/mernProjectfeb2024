import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Store/Auth";

const Navbar = () => {
  const { user, logOutHandal, getToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const handalLogout = () => {
    logOutHandal();
    navigate("/auth/login");
  };
  const handalShowOrNot = () => {
    if (pathname == "/auth/login") {
      return "d-none";
    } else if (pathname == "/auth/signin") {
      return "d-none";
    } else {
      return "";
    }
  };

  return (
    <>
      <div className={handalShowOrNot()}>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to={"/"}>
              Navbar
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to={"/"}>
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/"}>
                    Link
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/contectUs"}>
                    Contect Us
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    to={"/"}
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Dropdown
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink className="dropdown-item" to={"/"}>
                        Action
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to={"/"}>
                        Another action
                      </NavLink>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to={"/"}>
                        Something else here
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/service"}>
                    Service
                  </NavLink>
                </li>
                {user.isAdmin && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to={"/Admin/Adminpanal"}>
                      Admin Panal
                    </NavLink>
                  </li>
                )}
              </ul>
              <ul className="navbar-nav  mb-2 mb-lg-0">
                {getToken() ? (
                  <>
                    <li className="nav-item">
                      <NavLink to={"/user"} className="nav-link ">
                        {user.username}
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        onClick={handalLogout}
                        to={"/auth/login"}
                      >
                        LOGOUT
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" to={"/auth/login"}>
                        LOGIN
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to={"/auth/signin   "}>
                        SignUp
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
