import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import { UserContext } from "./logics/contexts/authContext";
import { CartContextProvider } from "./logics/contexts/cartContext";
import { OrderContextProvider } from "./logics/contexts/orderContext";

import Header from "./components/partials/Header";
import PrivateRoute from "./route/PrivateRoute";
import Landing from "./pages/Landing";
import User from "./pages/User";
import EditUser from "./pages/EditUser";
import ProductList from "./pages/ProductList";
import Cart from "./pages/customer/Cart";
import Partner from "./pages/partner/Partner";
import AddProduct from "./pages/partner/AddProduct";
import EditProduct from "./pages/partner/EditProduct";

import { checkAuth, setAuthToken } from "./api/main";

const styles = {
  container: {
    mt: 15,
    "@media (min-width: 600px)": {
      px: 2,
    },
    "@media (min-width: 768px)": {
      px: 4,
    },
    "@media (min-width: 900px)": {
      px: 4,
    },
    "@media (min-width: 1200px)": {
      px: 8,
    },
  },
};

//token initialization on axios instance headers every app refresh
if (localStorage.getItem("token")) {
  setAuthToken(localStorage.getItem("token"));
}

function App() {
  const { dispatch } = useContext(UserContext);
  useEffect(() => {
    checkUserAuthentication();
  }, []);

  const checkUserAuthentication = async () => {
    try {
      const { status, data } = await checkAuth();

      if (status === 401) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      let payload = data.data.user;
      payload.token = localStorage.getItem("token");

      dispatch({
        type: "LOGIN",
        payload,
      });
    } catch (error) {
      dispatch({
        type: "AUTH_ERROR",
      });
    }
  };
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 7200 * 1000 // 2 hours cache in memory 
      }
    }
  });
  return (
    <div>
      <CssBaseline />
      <QueryClientProvider client={client}>
        <CartContextProvider>
          <OrderContextProvider>
            <Router>
              <Header />
              <Container fixed sx={styles.container}>
                <Switch>
                  <Route exact path="/" component={Landing} />
                  <PrivateRoute exact path="/user/:id" component={User} />
                  <PrivateRoute exact path="/user/:id/edit" component={EditUser} />
                  <PrivateRoute exact path="/user/:id/cart" component={Cart} />
                  <PrivateRoute exact path="/partner" component={Partner} />
                  <PrivateRoute exact path="/partner/:id" component={User} />
                  <PrivateRoute exact path="/partner/:id/edit" component={EditUser} />
                  <PrivateRoute exact path="/partner/:id/add-product" component={AddProduct} />
                  <PrivateRoute exact path="/product/:id/edit" component={EditProduct} />
                  <PrivateRoute exact path="/restaurant/:id" component={ProductList} />
                </Switch>
              </Container>
            </Router>
          </OrderContextProvider>
        </CartContextProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
