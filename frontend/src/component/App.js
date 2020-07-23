import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from "../page/Login";
import UserContext from "../utils/userContext";
import "../style/app.css";
import PrivateRoute from "./PrivateRoute";
import Home from "../page/Home";

export default function App() {
  const userHook = useState(null);

  return (
    <UserContext.Provider value={userHook}>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <PrivateRoute exact={true} path="/" component={Home} />
        <Route path="*" component={() => <h1>Oops! not found.</h1>} />
      </Switch>
    </UserContext.Provider>
  );
}
