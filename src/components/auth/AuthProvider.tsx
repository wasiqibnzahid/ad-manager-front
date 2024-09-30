import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import React, { useEffect } from "react";
import CreateReport from "../CreateReport";
import ReportList from "../ReportList";
import ReportListUser from "../ReportListUser";
import Login from "./Login";
import UserList from "../UserList";
export const AuthProvider: React.FC = () => {
  const { isLoggedIn, userData } = useAuth();
  console.log("USER DATA IS ", isLoggedIn, userData);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
      return;
    }
    navigate("/login");
  }, []);
  return (
    <React.Fragment>
      <Routes>
        {isLoggedIn && userData.is_admin && (
          <>
            <Route path="/create-report-admin" element={<CreateReport />} />
            <Route path="/report-list-admin" element={<ReportList />} />
            <Route path="/users" element={<UserList />} />
            <Route
              path="/report-list-user/:id"
              element={<ReportListUser />}
            />
            <Route path="*" element={<Navigate to="/report-list-admin" />} />
          </>
        )}
        {isLoggedIn && !userData.is_admin && (
          <>
            <Route path="/report-list-user/:id" element={<ReportListUser />} />
            <Route
              path="*"
              element={
                <Navigate
                  to={`/report-list-user/${userData?.report_id || "NONE"}`}
                />
              }
            />
          </>
        )}
        {!isLoggedIn && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </React.Fragment>
  );
};
