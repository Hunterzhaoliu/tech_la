import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as authActionCreators from "../../actions/auth";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import { GREY_0, RED_VIOLET_3 } from "../../styles/ColorConstants";
import "./authentication-buttons.css";

class AuthenticationButtons extends Component {
  render() {
    return (
      <Row type="flex" justify="start" align="middle">
        <Col>
          <button
            style={{
              color: GREY_0,
              background: RED_VIOLET_3
            }}
            className="button-authentication"
            onClick={e => this.props.switchPopUpVisibility("login")}
          >
            Login
          </button>
        </Col>
        <Col style={{ paddingLeft: 10 }}>
          <button
            style={{
              color: GREY_0,
              background: RED_VIOLET_3
            }}
            className="button-authentication"
            onClick={e => this.props.switchPopUpVisibility("register")}
          >
            Sign up
          </button>
        </Col>
      </Row>
    );
  }
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
  null,
  mapDispatchToProps
)(AuthenticationButtons);
