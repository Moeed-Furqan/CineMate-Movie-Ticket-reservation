import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./login.css";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios, { formToJSON } from "axios";
// import { useNavigate } from "react-router-dom";

const notify = (text) => toast(text);

const Login = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isVisible, setVisible] = useState(false);
  //   const navigate = useNavigate();
  let confirmationPassword;
  const [loading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState({
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
    // setLoading(true);
    let loginResult = null;
    let signupResult = null;
    console.log(loginResult, signupResult);
    let backendUrl = "http://localhost:8000/ls/";
    isSignUp
      ? confirmationPassword === formValue.password
        ? ((backendUrl = backendUrl + "signup/"),
          sendData(backendUrl, formValue).then((result) => {
            result
              ? (notify("Homepage Khol app.jsx sa chal"),
                navigate("/homepage", {
                  state: {
                    username: formValue.email,
                    password: formValue.password,
                  },
                }))
              : notify("User name exist");
          }))
        : notify("Passwords dont match")
      : ((backendUrl = backendUrl + "login/"),
        sendData(backendUrl, formValue).then((result) => {
          result
            ? (notify("Successfully logged"),
              navigate("/homepage", {
                state: formValue.email,
              }))
            : notify("Wrong Username or Password");
        }));
    console.log(loginResult, signupResult);
  };
  const Handlechange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };
  const sendData = async (backendUrl, formValue) => {
    console.log(backendUrl, formValue);
    const response = await axios.post(backendUrl, formValue);
    console.log(response.data);
    return response.data;
  };
  const checkPasswordsMatch = (e) => {
    confirmationPassword = e.target.value;
    if (confirmationPassword !== formValue.password) {
      alert("Passwords dont match");
      return false;
    } else return true;
  };
  const signUp = () => {
    isSignUp ? setIsSignUp(false) : setIsSignUp(true);
  };

  return (
    <>
      <ToastContainer />
      <div className="mainSignupPage">
        <div className="outerBox">
          <h1>{isSignUp ? "Sign Up" : "Login"}</h1>
          <div>
            <form onSubmit={HandleSubmit}>
              <h3>User Name</h3>
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
                  style={{ cursor: "pointer", color: "red" }}
                >
                  {isSignUp ? "Sign In" : "Sign Up"}
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
