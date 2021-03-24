import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../logics/contexts/authContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { state } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        state.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { authenticated: false },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
