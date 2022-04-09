import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, error, isFetching, dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  // console.log("user:",user);
  // console.log("fetch:",isFetching);
  // console.log("err:",error);

  return (
    <div className="login">
      <video
        className="loginVideo"
        autoPlay
        loop
        muted
        poster="./assets/videoPoster.png"
      >
        <source src="./assets/video1.mp4" type="video/mp4" />
      </video>

      <div className="loginWrapper">
        <div className="loginLeft"></div>
        <div className="loginRight">
          <h3 className="loginRightCompanyName">Social Media</h3>
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              placeholder="Email"
              type="email"
              className="loginInput"
              ref={email}
              required
            />
            <input
              placeholder="Password"
              type="password"
              className="loginInput"
              ref={password}
              minLength="6"
              required
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="FBF8F1" size="20px" />
              ) : (
                "Login"
              )}
            </button>
            <div className="loginExtraButton">
              <span className="loginForgot">Forgot Password?</span>
              <span className="loginRegister">
                {isFetching ? (
                  <CircularProgress color="FBF8F1" size="20px" />
                ) : (
                  "Create New Account"
                )}
                {/* //need to update it */}
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
