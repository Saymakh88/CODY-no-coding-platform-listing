import "../../stylesheets/header.css";
import React, { useState } from "react";
import Signup from "../../components/main/signup";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import Button from "@mui/material/Button";
import { Context } from "../../Context";

const Header = (props) => {
  const [signupOpen, setSignupOpen] = useState(false);
  const currentUser = sessionStorage.getItem("user");
  const [List, setList, loading, setLoading] = useContext(Context);

  const logout = () => {
    sessionStorage.removeItem("user");
    window.location.replace("./login");
  };

  const showLoggedIn = () => {
    if (currentUser) {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/main/addreview">
              Add Review
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="../admin/dashboard">
              Dashboard
            </Link>
          </li>

          <li className="nav-item">
            <button onClick={logout} className="btn btn-danger">
              Logout
            </button>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="nav-item">
            <NavLink className="nav-link" to="./login" activeClassName="active">
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="./signup"
              activeClassName="active"
            >
              Signup
            </NavLink>
          </li>
        </>
      );
    }
  };
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fas fa-bars"></i>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <NavLink className="navbar-brand mt-2 mt-lg-0" to="/main/home">
            CODY
          </NavLink>

          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <NavLink className="nav-link" to="/main/browseplatform">
                Explore No-Code Platforms
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink className="nav-link" to="/main/comparison">
                Compare No-Code Platforms
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink className="nav-link" to="/main/login">
                Login
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink className="nav-link" to="/main/signup">
                Signup
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink className="nav-link" to="/admin/dashboard">
                Admin
              </NavLink>
            </li>
          </ul>
        </div>

        <div class="d-flex align-items-center">
          <a class="text-reset me-3" href="#">
            <i class="fas fa-shopping-cart"></i>
          </a>

          <div class="dropdown">
            <a
              class="text-reset me-3 dropdown-toggle hidden-arrow"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fas fa-bell"></i>
              <span class="badge rounded-pill badge-notification bg-danger">
                1
              </span>
            </a>
            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li>
                <a class="dropdown-item" href="#">
                  Some news
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Another news
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
            </ul>
          </div>

          <div class="dropdown">
            <a
              class="dropdown-toggle d-flex align-items-center hidden-arrow"
              href="#"
              id="navbarDropdownMenuAvatar"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                class="rounded-circle"
                height="25"
                alt="Black and White Portrait of a Man"
                loading="lazy"
              />
            </a>
            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuAvatar"
            >
              <li>
                <a class="dropdown-item" href="#">
                  My profile
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Settings
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
