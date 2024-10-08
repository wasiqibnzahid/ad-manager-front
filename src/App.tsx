import { Helmet } from "react-helmet";
import "./App.css";
import { AuthProvider } from "./components/auth/AuthProvider";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import CreateReport from "./components/CreateReport.js";
import ReportList from "./components/ReportList.js";
import ReportListUser from "./components/ReportListUser.jsx";
import PageNotFound from "./components/PageNotFound.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./components/auth/Login";
function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta http-equiv="x-ua-compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="" />
        <meta name="keyword" content="" />
        <meta name="author" content="flexilecode" />
        {/* <!--! The above 6 meta tags *must* come first in the head; any other head content must come *after* these tags !--> */}
        {/* <!--! BEGIN: Apps Title--> */}
        <title>Adbliv</title>
        {/* <!--! END:  Apps Title--> */}
        {/* <!--! BEGIN: Favicon--> */}
        <link
          rel="shortcut icon"
          type="image/png"
          href="/images/logo.png"
        />
        {/* <!--! END: Favicon--> */}
        {/* <!--! BEGIN: Bootstrap CSS--> */}
        <link
          rel="stylesheet"
          type="text/css"
          href="/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="/vendors/css/vendors.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="/vendors/css/daterangepicker.min.css"
        />
        {/* <!--! END: Vendors CSS--> */}
        {/* <!--! BEGIN: Custom CSS--> */}
        <link
          rel="stylesheet"
          type="text/css"
          href="/css/theme.min.css"
        />
        {/* <!--! END: Custom CSS--> */}
        {/* <!--! HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries !--> */}
        {/* <!--! WARNING: Respond.js doesn"t work if you view the page via file: !--> */}
        {/* <!--[if lt IE 9]> */}
        {/* <![endif]--> */}
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        />
      </Helmet>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthProvider />
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
