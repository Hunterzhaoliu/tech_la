import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActionCreators from "../actions/auth";
import { Layout, Row, Col } from "antd";
import "./landing.css";

import { GREY_0, GREY_8 } from "../styles/ColorConstants";

const { Content } = Layout;

class Landing extends Component {
  displayAuthentication() {
    const { auth } = this.props;
    if (auth.isAuthenticated) {
      return <h3 className="h3-logged-in">You're Logged In!</h3>;
    } else {
      return (
        <div>
          <Row type="flex" justify="center" align="middle">
            <Col
              span={10}
              style={{
                paddingTop: "60px"
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
            <Col span={10}>
              <Row
                type="flex"
                justify="center"
                align="middle"
                style={{ paddingTop: 30 }}
              >
                <Col>
                  <h5
                    style={{
                      color: GREY_8
                    }}
                  >
                    Already registered?
                  </h5>
                </Col>
                <Col offset={4}>
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
    return (
      <Content
        style={{
          backgroundColor: GREY_0,
          textAlign: "center",
          padding: "60px 0px 0px 0px"
        }}
      >
        <Row
          style={{
            paddingTop: "120px"
          }}
          type="flex"
          justify="center"
          align="middle"
        >
          <Col span={12}>
            <h1>tech.LA Engineering Challenge</h1>
          </Col>
        </Row>
        <Row
          style={{
            paddingTop: "60px"
          }}
          type="flex"
          justify="center"
          align="middle"
        >
          <Col span={12}>
            <h3>User Registration Flow</h3>
          </Col>
        </Row>
        <Row type="flex" justify="center" align="middle">
          <Col span={12}>{this.displayAuthentication()}</Col>
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
