import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import * as authActionCreators from "../../actions/auth";
import { connect } from "react-redux";
import { Layout, Row, Col } from "antd";
import close from "../../images/close.png";
import { GREY_0, GREY_8 } from "../../styles/ColorConstants";

const { Content } = Layout;

class HeaderMenuButtons extends Component {
  renderLogoutButton(aWidth) {
    const { isGoogleOauth } = this.props;
    if (isGoogleOauth) {
      return (
        <Col>
          <a
            style={{
              color: GREY_0,
              background: GREY_8,
              width: aWidth
            }}
            href="/auth/logout"
            onClick={e => this.props.logoutUser()}
          >
            Log Out
          </a>
        </Col>
      );
    } else {
      return (
        <Col>
          <a
            style={{
              color: GREY_0,
              background: GREY_8,
              width: aWidth
            }}
            className="button-logout"
            onClick={e => this.props.logoutUser()}
          >
            Log Out
          </a>
        </Col>
      );
    }
  }

  render() {
    const aWidth = "240px";
    return (
      <Content
        style={{
          height: "100vh"
        }}
        className="content-overlay"
      >
        <Row style={{ paddingBottom: 30 }} type="flex" justify="start">
          <Col>
            <a
              className="button-close"
              onClick={e => this.props.switchPopUpVisibility("menuButtons")}
            >
              <img className="img-close-button" src={close} alt="" />
            </a>
          </Col>
        </Row>
        <Row style={{ paddingBottom: 30 }} type="flex" justify="center">
          <Col>
            <a
              style={{
                width: aWidth,
                color: GREY_0,
                background: GREY_8
              }}
              onClick={e => this.props.switchPopUpVisibility("menuButtons")}
              href="/profile"
            >
              My Profile
            </a>
          </Col>
        </Row>
        <Row style={{ paddingBottom: 30 }} type="flex" justify="center">
          <Col>{this.renderLogoutButton(aWidth)}</Col>
        </Row>
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  isGoogleOauth: state.auth.isGoogleOauth
});

function mapDispatchToProps(dispatch) {
  const authDispatchers = bindActionCreators(authActionCreators, dispatch);

  return {
    switchPopUpVisibility: popUpName => {
      authDispatchers.switchPopUpVisibility(popUpName);
    },
    loginUser: (email, password) => {
      authDispatchers.loginUser(email, password);
    },
    logoutUser: () => {
      authDispatchers.logoutUser();
    }
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HeaderMenuButtons)
);
