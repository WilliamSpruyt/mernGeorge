import React from "react";

export class Board extends React.Component {
  render() {
    return (
      <div className="Answer">
          {this.props.score+" "}to go!
          </div>
    );
  }
}
