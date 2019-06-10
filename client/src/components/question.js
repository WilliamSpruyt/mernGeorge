import React from "react";
import { AnswerBox } from "./answerBox";
import { Col } from "react-bootstrap";
export class Question extends React.Component {
  render() {
    return (
      <Col xs={6} md={2}>
        <span>
          <div className="question">
            {this.props.x} {"\u00D7"} {this.props.y}{" "}
          </div>
          <AnswerBox
            focMe={this.props.focMe}
            id={this.props.id}
            handleChange={this.props.handleChange}
            answer={this.props.x * this.props.y}
          />
        </span>
      </Col>
    );
  }
}
