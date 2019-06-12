import React from "react";

export class Hangman extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <svg id="hangman" viewBox="0 0 500 700" height={this.props.height}>
        {this.props.deathNo > 1 && (
          <line
          x1="20" y1="675" x2="475" y2="675"
            strokeLinecap="round"
            stroke="black"
            strokeWidth="20"
          />
        )}
        {this.props.deathNo > 2 && (
          <line
          x1="25" y1="675" x2="25" y2="25"
            stroke="black"
            strokeWidth="20"
          />
        )}
        {this.props.deathNo > 3 && (
          <line
          x1="20" y1="25" x2="475" y2="25"
            strokeLinecap="round"
            stroke="black"
            strokeWidth="20"
          />
        )}
        {this.props.deathNo > 4 && (
          <line
          x1="20" y1="175" x2="170" y2="20"
            strokeLinecap="round"
            stroke="black"
            strokeWidth="20"
          />
        )}
        {this.props.deathNo > 5 && (
          <line
          x1="300" y1="25" x2="300" y2="125"
            stroke="black"
            strokeWidth="20"
          />
        )}
        {this.props.deathNo > 6 && (
          <circle
          cx="300"
          cy="175"
          r="50"
          
            stroke="black"
            strokeWidth="10"
            fill="white"
          />
        )}
        {this.props.deathNo > 7 && (
          <line
          x1="300" y1="225"   x2="300" y2="400"
            stroke="black"
            strokeWidth="10"
          />
        )}
        {this.props.deathNo > 8 && (
          <line
          x1="300" y1="250" x2="200" y2="300"
            strokeLinecap="round"
            stroke="black"
            strokeWidth="10"
          />
        )}
        {this.props.deathNo > 9 && (
          <line
          x1="300" y1="250" x2="400" y2="300"
            strokeLinecap="round"
            stroke="black"
            strokeWidth="10"
          />
        )}
        {this.props.deathNo > 10 && (
          <line
          x1="300" y1="400" x2="400" y2="550" 
            strokeLinecap="round"
            stroke="black"
            strokeWidth="10"
          />
        )}
        {this.props.deathNo > 11 && (
          <line
          x1="300" y1="400" x2="200" y2="550"
            strokeLinecap="round"
            stroke="black"
            strokeWidth="10"
          />
        )}
        {this.props.deathNo > 12 && (
          <circle
          cx="275"
          cy="150"
          r="10"
            stroke="black"
            strokeWidth="10"
            fill="white"
          />
        )}
        {this.props.deathNo > 13 && (
          <circle
          cx="325"
          cy="150"
          r="10"
            stroke="black"
            strokeWidth="10"
            fill="white"
          />
        )}
        {this.props.deathNo > 14 && (
          <path
            d="M 275 200 q 0 -50 50 0"
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
