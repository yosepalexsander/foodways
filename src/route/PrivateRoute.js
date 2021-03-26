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
        state.isLoading ? (
          <Loading />
        ) : state.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to="/"
          />
        )
      }
    />
  );
};

export default PrivateRoute;
