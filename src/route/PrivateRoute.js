import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../logics/contexts/authContext";


const PrivateRoute = ({ component: Component, ...rest }) => {
  const { state: { isAuthenticated } } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: {
                isAuthenticated,
              }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
