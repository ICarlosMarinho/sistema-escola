import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../utils/userContext";

function PrivateRoute({ exact, path, component }) {
  const authenticated = useContext(UserContext)[0];

  return authenticated ? (
    <Route exact={exact} path={path} component={component} />
  ) : (
    <Redirect to="/login" />
  );
}

export default PrivateRoute;
