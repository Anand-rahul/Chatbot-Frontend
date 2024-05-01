import React from "react";
import { Link, useNavigate } from "react-router-dom";
interface NavbarProps {
  PageName: string;
  setPageName: (newState: string) => void;
  setToken: (newState: string) => void;
}

const Navbar = ({ PageName, setPageName, setToken }: NavbarProps) => {
  const navigate = useNavigate();
  const onClick = () => {
    setPageName("Login Page");
    setToken("");
    navigate("/");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary text-white">
        <div className="container-fluid text-light">
          <a className="navbar-brand" href="#">
            {PageName}
          </a>
          <button
            className="navbar-toggler text-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/Home"
                  onClick={() => setPageName("Home")}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="#"
                  onClick={() => setPageName("ChatBot")}
                >
                  ChatBot
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
            <ul className="navbar-nav  mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/"
                  onClick={onClick}
                >
                  LogOut
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
