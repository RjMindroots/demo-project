import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Tables from "views/Tables";
import Index from "views/Index";
import Login from "views/auth/Login";
import Register from "views/auth/Register";

import { getAuth } from "./Redux/authReducer";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuth());
  }, [dispatch]);
  return (
    <Switch>
      <ProtectedRoute path="/dashboard" > <Tables/></ProtectedRoute>
      <GuestRoute path="/login">
        <Login />
      </GuestRoute>
      <GuestRoute path="/signup">
        <Register />
      </GuestRoute>
      <GuestRoute path="/" exact>
        {" "}
        <Index />
      </GuestRoute>
      <Redirect from="*" to="/" />
    </Switch>
  );
};

const ProtectedRoute = ({ children, ...rest }) => {
  const { isAuth } = useSelector((state) => state.authReducer);
  
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isAuth === false ? (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )  : (
          children
        );
      }}
    ></Route>
  );
};

const GuestRoute = ({ children, ...rest }) => {
  const { isAuth } = useSelector((state) => state.authReducer);
  return (
      <Route
          {...rest}
          render={({ location }) => {
              return isAuth === true ? (
                  <Redirect
                      to={{
                          pathname: '/dashboard',
                          state: { from: location },
                      }}
                  />
              ) : (
                  children
              );
          }}
      ></Route>
  );
};

export default App;
