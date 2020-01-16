import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as authActionCreators from "../actions/auth";
import { connect } from "react-redux";
import CustomHeader from "./header/CustomHeader";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import HeaderMenuButtons from "./header/HeaderMenuButtons";
import Landing from "./Landing";
import Profile from "./Profile";
import history from "./history";
import { Layout } from "antd";

class App extends Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  renderContent() {
    const { auth } = this.props;
    if (auth.loginIsVisible) {
      return <Login />;
    } else if (auth.registerIsVisible) {
      return <Register />;
    } else if (auth.menuButtonsIsVisible) {
      return <HeaderMenuButtons />;
    } else {
      return (
        <div>
          <CustomHeader />
          <Route exact={true} path="/" component={Landing} />
          <Route exact={true} path="/profile" component={Profile} />
        </div>
      );
    }
  }

  render() {
    return (
      <Router history={history}>
        <Layout
          style={{
            fontFamily: "Century Gothic Regular"
          }}
        >
          {this.renderContent()}
        </Layout>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  const authDispatchers = bindActionCreators(authActionCreators, dispatch);

  return {
    initializeApp: () => {
      authDispatchers.initializeApp();
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
