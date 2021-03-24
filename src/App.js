import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import { UserContextProvider } from "./logics/contexts/authContext";
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
      px: 6,
    },

  },
};
function App() {
  return (
    <div>
      <CssBaseline />
      <UserContextProvider>
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
                  <PrivateRoute
                    exact
                    path="/partner/:id/add-product"
                    component={AddProduct}
                  />
                  <PrivateRoute
                    exact
                    path="/product/:id/edit"
                    component={EditProduct}
                  />
                  <PrivateRoute
                    exact
                    path="/restaurant/:id"
                    component={ProductList}
                  />
                </Switch>
              </Container>
            </Router>
          </OrderContextProvider>
        </CartContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
