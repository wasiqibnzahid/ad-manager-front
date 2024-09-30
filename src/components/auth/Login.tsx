import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/auth";
import { AxiosError } from "axios";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useLogin();
  const [isLoading, setIsLoading] = useState(false);
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });
  async function handleLogin(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();

    setIsLoading(true);
    try {
      await login({
        username: authData.email,
        password: authData.password,
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (e) {
      if (e instanceof AxiosError) {
        alert(`Error Loggin In: ${e.response?.data?.detail}`);
      }
    }
    setIsLoading(false);
    // setTimeout(() => {
    //   localStorage.setItem("auth", JSON.stringify(authData));
    //   if (
    //     authData.email === "admin@gmail.com" &&
    //     authData.password === "12345"
    //   ) {
    //     navigate("/report-list-admin");
    //   } else {
    //     navigate("/report-list-user");
    //   }
    // }, 100);
  }

  return (
    <>
      <>
        {/*! ================================================================ !*/}
        {/*! [Start] Main Content !*/}
        {/*! ================================================================ !*/}
        <main className="auth-minimal-wrapper">
          <div className="auth-minimal-inner">
            <div className="">
              <div className="card mb-4 mt-5 mx-4 mx-sm-0 position-relative">
                <div className="bg-white p-2 rounded-circle position-absolute translate-middle top-0 start-50">
                  <img
                    src="src/assets/images/logo.png"
                    alt=""
                    style={{
                      width: "150px",
                      maxWidth: "unset"
                    }}
                    className="img-fluid"
                  />
                </div>
                <div className="card-body p-sm-5">
                  <h2 className="fs-20 fw-bolder mb-4">Login</h2>
                  <h4 className="fs-13 fw-bold mb-2">Login to your account</h4>
                  <form className="w-100 mt-4 pt-2">
                    <div className="mb-4">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email..."
                        required
                        value={authData.email}
                        onChange={(e) =>
                          setAuthData({ ...authData, email: e.target.value })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="****"
                        required
                        value={authData.password}
                        onChange={(e) =>
                          setAuthData({ ...authData, password: e.target.value })
                        }
                      />
                    </div>

                    <div className="mt-5">
                      <button
                        disabled={isLoading}
                        className="btn btn-lg btn-primary w-100"
                        onClick={handleLogin}
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
        {/*! ================================================================ !*/}
        {/*! [End] Main Content !*/}
        {/*! ================================================================ !*/}
      </>
    </>
  );
}
