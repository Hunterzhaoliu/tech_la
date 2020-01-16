import React, { Component } from "react";
import { connect } from "react-redux";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import MenuButtons from "./header/MenuButtons";
import { Layout } from "antd";

const { Content } = Layout;

class PopupContent extends Component {
  render() {
    const { auth } = this.props;

    if (auth.loginIsVisible) {
      // display login
      return (
        <Content
          style={{
            height: "100vh"
          }}
          className="content-overlay"
        >
          <Login />
        </Content>
      );
    } else if (auth.registerIsVisible) {
      // display registration
      return (
        <Content
          style={{
            height: "100vh"
          }}
          className="content-overlay"
        >
          <Register />
        </Content>
      );
    } else if (auth.menuButtonsIsVisible) {
      // display registration
      return (
        <Content
          style={{
            height: "100vh"
          }}
          className="content-overlay"
        >
          <MenuButtons />
        </Content>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  null
)(PopupContent);
