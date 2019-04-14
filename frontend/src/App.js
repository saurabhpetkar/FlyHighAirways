import React, { Component } from "react";
import { Route, Switch, withRouter, BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { connect } from "react-redux";

import { authCheckStatus } from "./store/actions/index";

import "antd/dist/antd.css";

import FlightSearch from "./containers/FlightSearch/FlightSearch";
import Auth from "./containers/Auth/Auth";
import CheckIn from "./containers/CheckIn/CheckIn";
import FlightBook from "./containers/FlightBook/FlightBook";
import HomePage from "./containers/Homepage/Hompage";
import Navbar from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// import Navbar from "./components/UI/Navbar/navbar";
// import Navbar from "./components/Header/Header";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  composeEnhancers,
  composeEnhancers(applyMiddleware(thunk))
);

class App extends Component {
  state = {
    flightInfo: {
      source: "",
      destination: "",
      date: ""
    },
    selectedFlight: null
  };

  componentDidMount() {
    this.props.autoSignUpHandler();
  }

  onFormSubmit = data => {
    this.setState({ flightInfo: data });
  };

  onFlightSelect = data => {
    this.setState({ selectedFlight: data });
  };

  render() {
    console.log("[STATE]", this.state);

    const HomePageWithProps = props => {
      return <HomePage formFill={this.onFormSubmit} />;
    };

    const FlightSearchWithProps = props => {
      return (
        <FlightSearch
          flightInfo={this.state.flightInfo}
          flightSelect={this.onFlightSelect}
        />
      );
    };

    const FlightFormWithProps = props => {
      return (
        <FlightBook
          selectedFlight={this.state.selectedFlight}
        />
      );
    }

    return (
      <React.Fragment>
        <Provider store={store}>
          <BrowserRouter>
            <Navbar isAuth={this.props.isAuthenticated} />
            <Switch>
              <Route path="/" exact render={HomePageWithProps} />
              <Route path="/flights" render={FlightSearchWithProps} />
              <Route path="/book-flight" render={FlightFormWithProps} />
              <Route path="/authenticate" component={Auth} />
              <Route path="/checkIn" component={CheckIn} />
            </Switch>
            <Footer />
          </BrowserRouter>
        </Provider>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    autoSignUpHandler: () => dispatch(authCheckStatus())
  };
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
