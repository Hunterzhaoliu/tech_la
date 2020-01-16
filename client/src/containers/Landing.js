import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActionCreators from "../actions/auth";
import { Layout, Row, Col } from "antd";
import "./landing.css";

import { GREY_0, GREY_5, GREY_8 } from "../styles/ColorConstants";

const { Content } = Layout;

class Landing extends Component {
  displaySignUp() {
    const { auth } = this.props;
    if (auth.isAuthenticated) {
      return <h2>You're Logged In!</h2>;
    } else {
      return (
        <div>
          <Row type="flex" justify="center" align="middle">
            <Col
              span={20}
              style={{
                padding: "12px 0px 0px 0px" // TRBL
              }}
            >
              <button
                style={{
                  color: GREY_0,
                  background: GREY_8,
                  width: "100%"
                }}
                onClick={e => this.props.switchPopUpVisibility("register")}
              >
                Create an account
              </button>
            </Col>
          </Row>
          <Row type="flex" justify="center" align="middle">
            <Col span={20}>
              <Row
                type="flex"
                justify="center"
                align="middle"
                style={{ paddingTop: 12 }}
              >
                <Col>
                  <h5
                    style={{
                      color: GREY_8
                    }}
                  >
                    Already a member?
                  </h5>
                </Col>
                <Col offset={1}>
                  <button
                    style={{
                      color: GREY_0,
                      background: GREY_8
                    }}
                    onClick={e => this.props.switchPopUpVisibility("login")}
                  >
                    Log in
                  </button>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      );
    }
  }

  render() {
    const { windowWidth } = this.props;
    // display how site works infographic
    return (
      <Content
        style={{
          backgroundColor: GREY_0,
          textAlign: "center",
          padding: "0px 0px 0px 0px" // TRBL
        }}
      >
        <Row type="flex" justify="center" align="middle">
          <Col span={23}>{this.displaySignUp()}</Col>
        </Row>
      </Content>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    windowWidth: state.customHeader.windowWidth
  };
}

function mapDispatchToProps(dispatch) {
  const authDispatchers = bindActionCreators(authActionCreators, dispatch);

  return {
    switchPopUpVisibility: popUpName => {
      authDispatchers.switchPopUpVisibility(popUpName);
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
