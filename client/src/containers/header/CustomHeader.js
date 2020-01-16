import React, { Component } from "react";
import * as authActionCreators from "../../actions/auth";
import * as customHeaderActionCreators from "../../actions/customHeader";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Layout, Row, Col, Icon } from "antd";
import "./custom-header.css";
import logo from "../../images/logo.png";
import { GREY_8 } from "../../styles/ColorConstants";
const { Header } = Layout;

class CustomHeader extends Component {
  constructor(props) {
    super(props);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.props.updateWindowDimensions(window.innerWidth, window.innerHeight);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  renderHeaderButtons() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      return (
        <Row
          style={{ height: "60px" }}
          type="flex"
          justify="space-between"
          align="middle"
        >
          <Col>
            <div style={{ width: "44px" }} />
          </Col>
          <Col>
            <a className="a-logo" href="/">
              <img alt="" style={{ width: "100px" }} src={logo} />
            </a>
          </Col>
          <Col>
            <button
              style={{ background: "red", color: GREY_8 }}
              onClick={e => this.props.switchPopUpVisibility("menuButtons")}
            >
              <Icon type="menu" />
            </button>
          </Col>
        </Row>
      );
    } else {
      return (
        <Row
          style={{ height: "60px" }}
          type="flex"
          justify="space-between"
          align="middle"
        >
          <Col>
            <a style={{ background: "red", color: GREY_8 }} href="/">
              <Icon type="left" />
            </a>
          </Col>
          <Col>
            <a className="a-logo" href="/">
              <img alt="" style={{ width: "100px" }} src={logo} />
            </a>
          </Col>
          <Col>
            <div style={{ width: "44px" }} />
          </Col>
        </Row>
      );
    }
  }

  render() {
    return (
      <Header
        style={{
          background: "red",
          position: "fixed",
          zIndex: 2, // make every component display under the header
          width: "100%",
          height: "60px",
          lineHeight: "60px",
          padding: "0px 15px"
        }}
      >
        {this.renderHeaderButtons()}
      </Header>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
}

function mapDispatchToProps(dispatch) {
  const customHeaderDispatchers = bindActionCreators(
    customHeaderActionCreators,
    dispatch
  );

  const authDispatchers = bindActionCreators(authActionCreators, dispatch);

  return {
    updateWindowDimensions: (newWindowWidth, newWindowHeight) => {
      customHeaderDispatchers.updateWindowDimensions(
        newWindowWidth,
        newWindowHeight
      );
    },
    switchPopUpVisibility: popUpName => {
      authDispatchers.switchPopUpVisibility(popUpName);
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomHeader);
