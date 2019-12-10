import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import Header from "./layout/Header";
import Alerts from "./layout/Alerts";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import CalendarForm from "./calendar/CalendarForm";
import MonthView from "./calendar/MonthView";
import PrivateRoute from "./common/PrivateRoute";
import { loadUser } from "../actions/auth";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import { Provider } from "react-redux";
import store from "../store";
import ResourceBuilder from "./shifts/ResourceBuilder";

const alertOptions = {
  timeout: 4000,
  position: "top center"
};

const InvalidPage = () => {
  return (
    <div className="container mt-5">
      <h2>Oops! Page not found</h2>;
    </div>
  );
};

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Header />
              <Alerts />
              <div className="container-fluid">
                <Switch>
                  <PrivateRoute exact path="/" component={CalendarForm} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/dayview" component={CalendarForm} />
                  <Route
                    exact
                    path="/resource-builder"
                    component={ResourceBuilder}
                  />
                  <Route exact path="/monthview" component={MonthView} />
                  <Route component={InvalidPage} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
