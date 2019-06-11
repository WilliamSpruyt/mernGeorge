import React from "react";

export class Hangman extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <svg id="hangman" height="800" width="500">
        {this.props.deathNo > 1 && (
          <line
            x1="20"
            y1="775"
            x2="475"
            y2="775"
            strokeLinecap="round"
            stroke="black"
            strokeWidth="10"
          />
        )}
        {this.props.deathNo > 2 && (
          <line
            x1="25"
            y1="775"
            x2="25"
            y2="25"
            stroke="black"
            strokeWidth="10"
          />
        )}
        {this.props.deathNo > 3 && (
          <line
            x1="20"
            y1="25"
            x2="475"
            y2="25"
            strokeLinecap="round"
            stroke="black"
            strokeWidth="10"
          />
        )}
        {this.props.deathNo > 4 && (
          <line
            x1="350"
            y1="25"
            x2="350"
            y2="225"
            stroke="black"
            strokeWidth="10"
          />
        )}
        {this.props.deathNo > 5 && (
          <circle
            cx="350"
            cy="275"
            r="50"
            stroke="black"
            strokeWidth="10"
            fill="white"
          />
        )}
        {this.props.deathNo > 6 && (
          <line
            x1="350"
            y1="325"
            x2="350"
            y2="500"
            stroke="black"
            strokeWidth="10"
          />
        )}
        {this.props.deathNo >7 && (
          <line
            x1="350"
            y1="350"
            x2="250"
            y2="400"
            strokeLinecap="round"
            stroke="black"
            strokeWidth="10"
          />
        )}
        {this.props.deathNo > 8 && (
          <line
            x1="350"
            y1="350"
            x2="450"
            y2="400"
            strokeLinecap="round"
            stroke="black"
            strokeWidth="10"
          />
        )}
        {this.props.deathNo > 9 && (
          <line
            x1="350"
            y1="500"
            x2="450"
            y2="650"
            strokeLinecap="round"
            stroke="black"
            strokeWidth="10"
          />
        )}
        {this.props.deathNo > 10 && (
          <line
            x1="350"
            y1="500"
            x2="250"
            y2="650"
            strokeLinecap="round"
            stroke="black"
            strokeWidth="10"
          />
        )}
        {this.props.deathNo > 11 && (
          <circle
            cx="325"
            cy="250"
            r="10"
            stroke="black"
            strokeWidth="10"
            fill="white"
          />
        )}
        {this.props.deathNo > 12 && (
          <circle
            cx="375"
            cy="250"
            r="10"
            stroke="black"
            strokeWidth="10"
            fill="white"
          />
        )}
        {this.props.deathNo > 13 && (
          <path
            d="M 325 300 q 0 -50 50 0"
            strokeLinecap="round"
            stroke="black"
            strokeWidth="5"
            fill="none"
          />
        )}
      </svg>
    );
  }
}
