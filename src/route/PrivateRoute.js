import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../logics/contexts/authContext";

import Loading from "../components/micro/Loading";


const PrivateRoute = ({ component: Component, ...rest }) => {
  const { state } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        state.isAuthenticated ? (
          <Component {...props} />
        ) : state.isLoading ? (
          <Loading />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: state.isAuthenticated
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
