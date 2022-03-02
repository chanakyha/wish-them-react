import React from "react";
import "./Navbar.css";
import { getAuth, signOut } from "firebase/auth";
import PersonCircle from "bootstrap-icons/icons/person-circle.svg";
import BoxArrowRight from "bootstrap-icons/icons/box-arrow-right.svg";

function Navbar(props) {
  const signOutFunc = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("Signed Out");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="navbar">
      <nav className="navbar fixed-top navbar-dark navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Wish Them
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end  bg-dark text-light"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header bg-secondary">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                Context
              </h5>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <a
                    className="text-sm-dark nav-link active"
                    aria-current="page"
                    href="#"
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">
                    {props.displayName || "Username"} &nbsp;
                    <img
                      src={props.photoURL || PersonCircle}
                      className=""
                      style={{
                        width: "1.9em",
                        height: "1.9em",
                        borderRadius: "50%",
                      }}
                    />
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    onClick={signOutFunc}
                    className="nav-link active btn btn-danger"
                    href="#"
                  >
                    SignOut &nbsp;
                    <img src={BoxArrowRight}></img>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
