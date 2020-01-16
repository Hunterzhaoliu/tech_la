import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as authActionCreators from "../../actions/auth";
import { connect } from "react-redux";
import { Layout, Row, Col, Icon, Divider } from "antd";
import InputField from "../input/InputField";
import close from "../../images/close.png";
import "./login.css";
import { GREY_5, GREY_8 } from "../../styles/ColorConstants";

const { Content } = Layout;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidUpdate(previousProps) {
    if (this.props.auth.loginErrors !== previousProps.auth.loginErrors) {
      this.setState({
        errors: this.props.auth.loginErrors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    // stops the page from reloading when the submit button is clicked
    e.preventDefault();

    this.props.loginUser(this.state.email, this.state.password);
  };

  render() {
    const { windowWidth } = this.props;
    const { errors } = this.state;

    const inputWidth = windowWidth - 64;
    return (
      <Content
        style={{
          height: "100vh"
        }}
        className="content-overlay"
      >
        {" "}
        <Row style={{ paddingBottom: 30 }} type="flex" justify="start">
          <Col>
            <button
              className="button-close"
              onClick={e => this.props.switchPopUpVisibility("login")}
            >
              <img className="img-close-button" src={close} alt="" />
            </button>
          </Col>
        </Row>
        <Row>
          <Col>
            <form onSubmit={this.onSubmit}>
              <Row type="flex" justify="center">
                <Col>
                  <InputField
                    value={this.state.email}
                    placeholder="e-mail"
                    errorMessage={errors.email}
                    hasError={errors.email}
                    onChange={this.onChange}
                    width={inputWidth}
                    id="email"
                    type="email"
                  />
                </Col>
              </Row>
              <Row style={{ paddingTop: 30 }} type="flex" justify="center">
                <Col>
                  <InputField
                    value={this.state.password}
                    placeholder="password"
                    errorMessage={errors.password}
                    hasError={errors.password}
                    onChange={this.onChange}
                    width={inputWidth}
                    id="password"
                    type="password"
                  />
                </Col>
              </Row>
              <Row style={{ paddingTop: 30, color: GREY_8, fontSize: "20px" }}>
                <Col>
                  <button className="button-login" type="submit">
                    Login
                  </button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
        <Divider style={{ color: GREY_5 }}>or</Divider>
        <Row type="flex" justify="start">
          <Col>
            <a
              style={{ color: GREY_5 }}
              className="a-google-oauth"
              href="/auth/google"
              onClick={e => this.props.switchPopUpVisibility("login")}
            >
              <Row
                style={{
                  color: GREY_8,
                  fontSize: "20px"
                }}
                type="flex"
                justify="space-between"
              >
                <Col>
                  <Icon type="google" />
                </Col>
                <Col style={{ paddingLeft: 8 }}>
                  <div>Login with Google</div>
                </Col>
              </Row>
            </a>
          </Col>
        </Row>
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  windowWidth: state.customHeader.windowWidth,
  auth: state.auth
});

function mapDispatchToProps(dispatch) {
  const authDispatchers = bindActionCreators(authActionCreators, dispatch);

  return {
    switchPopUpVisibility: popUpName => {
      authDispatchers.switchPopUpVisibility(popUpName);
    },
    loginUser: (email, password) => {
      authDispatchers.loginUser(email, password);
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
