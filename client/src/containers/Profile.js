import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as profileActionCreators from "../actions/profile";
import { connect } from "react-redux";
import { Layout, Row, Col, Icon, Divider } from "antd";
import InputField from "./input/InputField";
import InputChoice from "./input/InputChoice";

import { GREY_0, GREY_5, GREY_8 } from "../styles/ColorConstants";
import "./profile.css";

const { Content } = Layout;

const genderOptions = [
  {
    label: "Male",
    value: "Male"
  },
  {
    label: "Female",
    value: "Female"
  },
  {
    label: "Other",
    value: "Other"
  }
];

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      firstName: null,
      lastName: null,
      age: null,
      gender: null,
      errors: {}
    };
  }

  componentDidMount() {
    // when a user immedietely logs in, the history.push does not cause the page
    // to rerender, so the mongoDBUserId is still in the state
    this.props.onProfile(this.props.auth.mongoDBUserId);
  }

  componentDidUpdate(previousProps) {
    if (this.props.auth.mongoDBUserId !== previousProps.auth.mongoDBUserId) {
      // once the user's mongoDBUserId is retrieved from the database, fetch
      // the user's profile
      this.props.onProfile(this.props.auth.mongoDBUserId);
    }

    if (this.props.profile !== previousProps.profile) {
      // once the user's profile is retrieved from the database, set the local
      // state
      for (const key in this.state) {
        if (this.props.profile.values[key] === undefined) {
          // user doesn't have this information in the database yet, keep the
          // value in the state = null
        } else {
          // user has this information in the database, update the state
          this.setState({
            [key]: this.props.profile.values[key]
          });
        }
      }
      this.setState({
        errors: this.props.profile.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onChangeGender = e => {
    this.setState({ gender: e.target.value });
  };

  renderProfileDescription(profile) {
    return (
      <h2
        className="h2-account"
        style={{
          color: GREY_8
        }}
      >
        Account
      </h2>
    );
  }

  renderSaveIcon(saveState) {
    if (saveState === "start") {
      return <Icon type="loading" />;
    } else if (saveState === "done") {
      return <Icon type="check" />;
    } else if (saveState === "error") {
      return <Icon type="warning" />;
    }
  }

  renderInput() {
    const errors = this.state.errors;

    return (
      <div>
        <Row style={{ paddingTop: 15 }} type="flex" justify="center">
          <Col>
            <InputField
              value={this.state.firstName}
              placeholder="First Name"
              onChange={this.onChange}
              hasError={false}
              width={"350px"}
              id="firstName"
              type="string"
            />
          </Col>
        </Row>
        <Row style={{ paddingTop: 15 }} type="flex" justify="center">
          <Col>
            <InputField
              value={this.state.lastName}
              placeholder="Last Name"
              onChange={this.onChange}
              hasError={false}
              width={"350px"}
              id="lastName"
              type="string"
            />
          </Col>
        </Row>
        <Row style={{ paddingTop: 15 }} type="flex" justify="center">
          <Col>
            <InputField
              value={this.state.age}
              placeholder="Age"
              errorMessage="Age should be between 13 and 100."
              hasError={errors.ageError}
              onChange={this.onChange}
              width={"350px"}
              id="age"
              type="number"
            />
          </Col>
        </Row>
        <Row style={{ paddingTop: 30 }} type="flex" justify="center">
          <Col>
            <InputChoice
              title=""
              options={genderOptions}
              value={this.state.gender}
              onChange={this.onChangeGender}
            />
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    const { auth, profile } = this.props;

    return (
      <Content
        style={{
          backgroundColor: GREY_0,
          height: "100vh",
          width: "100vw",
          textAlign: "center",
          padding: "60px 0px 0px 0px"
        }}
      >
        <Row style={{ paddingTop: "60px" }} type="flex" justify="center">
          <Col>
            {this.renderProfileDescription(profile)}
            <Divider style={{ color: GREY_5 }}>Profile</Divider>
            <Row style={{ paddingBottom: 10 }} type="flex" justify="center">
              <Col span={22}>
                {this.renderInput()}
                <Row style={{ paddingTop: 30 }} type="flex" justify="center">
                  <Col>
                    <button
                      className="button-profile-save"
                      onClick={
                        () =>
                          this.props.saveProfile(
                            auth.mongoDBUserId,
                            JSON.parse(JSON.stringify(this.state))
                          ) // need to send copy of state
                      }
                    >
                      Save {this.renderSaveIcon(profile.saveState)}
                    </button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    windowWidth: state.customHeader.windowWidth,
    profile: state.profile
  };
}

function mapDispatchToProps(dispatch) {
  const profileDispatchers = bindActionCreators(
    profileActionCreators,
    dispatch
  );

  return {
    onProfile: mongoDBUserId => {
      profileDispatchers.onProfile(mongoDBUserId);
    },
    saveProfile: (mongoDBUserId, profile) => {
      profileDispatchers.saveProfile(mongoDBUserId, profile);
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
