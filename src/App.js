import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { UserContextProvider } from "./logics/contexts/authContext";
import { CartContextProvider } from "./logics/contexts/cartContext";

import Header from "./components/partials/Header";
import PrivateRoute from "./route/PrivateRoute";
import Landing from "./pages/Landing";
import ProductList from "./pages/ProductList";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";

const styles = {
  container: {
    "@media (min-width: 600px)": {
      px: 10,
      pt: 8,
    },
  },
};
function App() {
  return (
    <div>
      <CssBaseline />
      <UserContextProvider>
        <CartContextProvider>
          <Router>
            <Header />
            <Container fixed sx={styles.container}>
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/user/:id" component={Profile} />
                <PrivateRoute path="/user/:id/cart" component={Cart} />
                <PrivateRoute
                  exact
                  path="/restaurants/:id"
                  component={ProductList}
                />
              </Switch>
            </Container>
          </Router>
        </CartContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
