import React from "react";
import "../index.css"
import { MdCheck } from "react-icons/lib/md";
import { FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

export class AnswerBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState(
      event.target.value !== String(this.props.answer)
        ? { value: event.target.value }
        : { ticked: true }
    );
    this.props.handleChange(
      this.id,
      event.target.value === String(this.props.answer) ? true : false
    );
  }

  render() {
    if (!this.state.ticked) {
      return (
        <form  style={{  
          alignItems: 'center',verticalAlign: 'middle'}}>
          <FormControl
          style={{fontSize: '5vw',height:'8vw',width:'15vw',verticalAlign: 'middle'}}
            autoFocus={true}
            type="number"
            appearance="none"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </form>
      );
    } else
      return (
        <div id="ansDiv">
          {this.props.answer} <MdCheck />{" "}
        </div>
      );
  }
}
