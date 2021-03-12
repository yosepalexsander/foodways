import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import PrivateRoute from './route/PrivateRoute';
import Landing from './pages/Landing';
import RestaurantDetail from './pages/RestaurantDetail';
import RegisterModal from "./components/modal/RegisterModal";
import LoginModal from "./components/modal/LoginModal";

function App() {
  return (
    <div>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/" component={Landing}/>
          <Route exact path="/register" component={RegisterModal} />
          <Route exact path="/login" component={LoginModal} />
          <PrivateRoute exact path="/restaurants/:id" component={RestaurantDetail} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
