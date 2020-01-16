import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Radio } from "antd";
import "./input-choice.css";
import { GREY_6 } from "../../styles/ColorConstants";

class InputChoice extends Component {
  renderTitle() {
    const { title } = this.props;
    if (title !== "") {
      return (
        <Col>
          <h6 style={{ color: GREY_6, lineHeight: 1 }}>{title} </h6>
        </Col>
      );
    }
  }
  render() {
    const { options, value } = this.props;
    return (
      <Row type="flex" justify="start" align="middle">
        {this.renderTitle()}
        <Col style={{ paddingLeft: 15 }}>
          <Radio.Group
            options={options}
            onChange={this.props.onChange}
            value={value}
          />
        </Col>
      </Row>
    );
  }
}

export default connect(
  null,
  null
)(InputChoice);
