import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as authActionCreators from "../../actions/auth";
import { connect } from "react-redux";
import { Layout, Row, Col, Icon, Divider } from "antd";
import InputField from "../input/InputField";
import close from "../../images/close.png";
import "./register.css";
import { GREY_5, GREY_8 } from "../../styles/ColorConstants";

const { Content } = Layout;

class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmedPassword: "",
      errors: {}
    };
  }

  componentDidUpdate(previousProps) {
    if (this.props.auth.registerErrors !== previousProps.auth.registerErrors) {
      this.setState({
        errors: this.props.auth.registerErrors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    // stops the page from reloading when the submit button is clicked
    e.preventDefault();
    const newUser = {
      email: this.state.email,
      password: this.state.password,
      confirmedPassword: this.state.confirmedPassword
    };

    this.props.registerUser(newUser);
  };

  render() {
    const { errors } = this.state;

    return (
      <Content className="content-overlay">
        <Row type="flex" justify="center">
          <Col>
            <Row style={{ paddingBottom: 15 }} type="flex" justify="start">
              <Col>
                <button
                  className="button-close"
                  onClick={e => this.props.switchPopUpVisibility("register")}
                >
                  <img className="img-close-button" src={close} alt="" />
                </button>
              </Col>
            </Row>
            <Row>
              <Col>
                <form onSubmit={this.onSubmit}>
                  <Row style={{ paddingTop: 15 }} type="flex" justify="start">
                    <Col>
                      <InputField
                        value={this.state.email}
                        placeholder="e-mail"
                        errorMessage={errors.email}
                        hasError={errors.email}
                        onChange={this.onChange}
                        width={"350px"}
                        id="email"
                        type="email"
                      />
                    </Col>
                  </Row>
                  <Row style={{ paddingTop: 15 }} type="flex" justify="start">
                    <Col>
                      <InputField
                        value={this.state.password}
                        placeholder="password"
                        errorMessage={errors.password}
                        hasError={errors.password}
                        onChange={this.onChange}
                        width={"350px"}
                        id="password"
                        type="password"
                      />
                    </Col>
                  </Row>
                  <Row style={{ paddingTop: 15 }} type="flex" justify="start">
                    <Col>
                      <InputField
                        value={this.state.confirmedPassword}
                        placeholder="confirm password"
                        errorMessage={errors.confirmedPassword}
                        hasError={errors.confirmedPassword}
                        onChange={this.onChange}
                        width={"350px"}
                        id="confirmedPassword"
                        type="password"
                      />
                    </Col>
                  </Row>
                  <Row
                    style={{ paddingTop: 30, color: GREY_8, fontSize: "20px" }}
                  >
                    <Col>
                      <button className="button-register" type="submit">
                        Sign up
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
                  onClick={e => this.props.switchPopUpVisibility("register")}
                >
                  <Row type="flex" justify="space-between">
                    <Col>
                      <Icon style={{ color: GREY_8 }} type="google" />
                    </Col>
                    <Col
                      style={{
                        paddingLeft: 8,
                        color: GREY_8,
                        fontSize: "16px"
                      }}
                    >
                      <div>Sign up with Google</div>
                    </Col>
                  </Row>
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

function mapDispatchToProps(dispatch) {
  const authDispatchers = bindActionCreators(authActionCreators, dispatch);

  return {
    switchPopUpVisibility: popUpName => {
      authDispatchers.switchPopUpVisibility(popUpName);
    },
    registerUser: newUser => {
      authDispatchers.registerUser(newUser);
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
