import React, { useState, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
import "./login.css";
// import { useNavigate } from "react-router-dom";

const notify = (text) => toast(text);

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [verification, setVerification] = useState(0);
  const [isVisible, setVisible] = useState(false);
  //   const navigate = useNavigate();
  let confirmationPassword;
  const [loading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    Handlechange(e);
  };
  const handleCode = (e) => {
    setCode(parseInt(e.target.value));
  };
  const [email, setEmail] = useState("");

  const HandleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("visible", isVisible);
  };
  const Handlechange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const checkPasswordsMatch = (e) => {
    confirmationPassword = e.target.value;
    if (confirmationPassword !== formValue.password) {
      notify("Passwords do not match");
      return false;
    } else return true;
  };

  const signUp = () => {
    isSignUp ? setIsSignUp(false) : setIsSignUp(true);
  };

  return (
    <>
      <div className="mainSignupPage">
        <div className="outerBox">
          <h1>{isSignUp ? "Sign Up" : "Login"}</h1>
          <div>
            <form onSubmit={HandleSubmit}>
              <h3>Email</h3>
              <input
                type="text"
                name="email"
                value={formValue.email}
                onChange={Handlechange}
                required
              />
              <h3>Password</h3>
              <input
                type="password"
                name="password"
                value={formValue.password}
                onChange={Handlechange}
                required
              />
              {isSignUp ? (
                <>
                  <h3>Confirm Password</h3>
                  <input
                    type="password"
                    name="confirmpassword"
                    value={confirmationPassword}
                    onBlur={checkPasswordsMatch}
                    required
                  />
                </>
              ) : null}

              <button type="submit">{loading ? "Loading..." : "Submit"}</button>
              <p>
                {isSignUp ? "Registered?" : "Not registered?"}{" "}
                <span
                  onClick={signUp}
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  {isSignUp ? "Sign In" : "Sign Up"}
                </span>
              </p>
              {/* ********************************************************* */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
