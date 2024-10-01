import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS import
import { Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth, useLogout } from "../hooks/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData: authData } = useAuth();
  const { logout } = useLogout();
  const { userData } = useAuth();
  const isAdmin = userData.is_admin;
  function handleLogout() {
    logout();
    navigate("/login");
  }
  return (
    <div>
      <>
        <>
          <nav
            className="nxl-header px-4 p-0-750px"
            style={{
              top: 0,
              left: 0,
              position: "static",
              height: "40px",
            }}
          >
            <div className="header-wrapper p-0-750px" style={{ maxWidth: "1400px" }}>
              {/*! [Start] Header Left !*/}
              <div className="header-left d-flex align-items-center gap-4">
                <img
                  src="src/assets/images/logo.png"
                  alt=""
                  className="logo logo-lg"
                  style={{ width: "150px", padding: 0 }}
                />
              </div>
              {/*! [End] Header Left !*/}
              {/*! [Start] Header Right !*/}
              <div className="header-right ms-auto ">
                <div className="d-flex align-items-center">
                  <div className="dropdown nxl-h-item">
                    <span className="user-email">{authData.username}</span>
                    {isAdmin && (
                      <>
                        <NavLink
                          className="text-white no-underline"
                          style={{
                            textDecoration: "none !important",
                          }}
                          to="/report-list-admin"
                        >
                          <Button
                            className="btn mx-2 btn-primary d-flex justify-content-center align-items-center"
                            style={{ width: "120px", height: "35px" }}
                          >
                            Reports
                          </Button>
                        </NavLink>
                        <NavLink
                          className="text-white no-underline"
                          style={{
                            textDecoration: "none !important",
                          }}
                          to="/users"
                        >
                          <Button
                            className="btn mx-2 btn-primary d-flex justify-content-center align-items-center"
                            style={{ width: "120px", height: "35px" }}
                          >
                            Users
                          </Button>
                        </NavLink>
                      </>
                    )}
                    <Button
                      className="btn mx-2 btn-primary d-flex justify-content-center align-items-center"
                      style={{ width: "120px", height: "35px" }}
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
              {/*! [End] Header Right !*/}
            </div>
          </nav>
          {/*! ================================================================ !*/}
          {/*! [End] Header !*/}
        </>
      </>
    </div>
  );
};

export default Navbar;
