import React, { useEffect, useState } from "react";
import { YDPrimaryButton, YDInput } from "../sdk";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";
import { Redirect } from "react-router-dom";
import "./login.css";

const Login = () => {
  const baseurl = "https://dev-api.yourdaily.co.in";
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenStored = localStorage.getItem("userToken");
    setToken(tokenStored);
  }, []);

  const handleClickPassword = () => {
    setShowPassword(!showPassword);
  };

  async function handleClick() {
    let id = { email, password };
    setEmail("");
    setPassword("");
    let result = await fetch(`${baseurl}/api/sm-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id),
    });
    result = await result.json();
    localStorage.setItem("userToken", result.Authorization);

    if (result.Authorization) {
      setToken(result.Authorization);
    }
  }

  if (token !== null && token !== "undefined") {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <section className="loginSection">
        <div>
          <img
            className="logo"
            src="./Assets/Wihite BG horizontal@2x.png"
            alt="logo"
          />
        </div>
        <article>
          <img
            className="image"
            src="./Assets/Illustrator 1@2x.png"
            alt="main bg"
          />

          <div className="login">
            <aside>
              <h1>LOGIN</h1>
              <h2>Please login to your account</h2>
            </aside>
            <YDInput
              focused
              required
              id="login"
              label="User ID"
              placeholder="Enter User ID"
              type="text"
              value={email}
              something={<img src="./Assets/userIcon.svg" alt="userImg" />}
              style={{ padding: "5px" }}
              onChange={(e) => setEmail(e.target.value)}
            />
            <YDInput
              focused
              required
              id="password"
              label="Password"
              placeholder="Enter Password"
              type={showPassword ? "text" : "password"}
              value={password}
              something={
                <IconButton onClick={handleClickPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              }
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <YDPrimaryButton
              value="Login"
              style={{
                padding: "15px",
                marginTop: "24px",
                fontSize: "16px",
                value: "Login",
              }}
              onClick={() => {
                handleClick();
              }}
            />
            <div className="fpass">
              <p>Forgot Password?</p>
            </div>
          </div>
        </article>
      </section>
    </>
  );
};

export default Login;
