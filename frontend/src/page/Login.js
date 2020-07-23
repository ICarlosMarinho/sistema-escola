import React from "react";
import LoginContainer from "../component/LoginContainer";
import "../style/login.css";

export default function Login() {
  return (
    <div className="page login">
      <header className="header"></header>
      <LoginContainer />
      <footer className="footer"></footer>
    </div>
  );
}
