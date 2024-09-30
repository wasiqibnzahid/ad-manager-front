import React from "react";

function PageNotFound() {
  return (
    <main className="auth-minimal-wrapper">
      <div className="auth-minimal-inner">
        <div className="minimal-card-wrapper">
          <div className="card mb-4 mt-5 mx-4 mx-sm-0 position-relative">
            <div className="wd-50 bg-white p-2 rounded-circle shadow-lg position-absolute translate-middle top-0 start-50">
              <img
                src="assets/images/logo-abbr.png"
                alt=""
                className="img-fluid"
              />
            </div>
            <div className="card-body p-sm-5 text-center">
              <h2 className="fw-bolder mb-4" style={{ fontSize: 120 }}>
                4<span className="text-danger">0</span>4
              </h2>
              <h4 className="fw-bold mb-2">Page not found</h4>
              <p className="fs-12 fw-medium text-muted">
                Sorry, the page you are looking for can't be found, Or you do not have access to it!
              </p>
              <div className="mt-5">
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PageNotFound;
