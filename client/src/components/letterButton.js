import React from "react";
import "../index.css";
export default class LetterButton extends React.Component {
  constructor(props) {
    super(props);
     this.state={clicked:false}
  
  }
   
  render() {
    return (
      <div 
        onClick={
           ()=>{ this.props.handleLetterPress(this.props.letter)}}
           
                 >
        <svg width="50" height="50" >
          <circle
            cx="25"
            cy="25"
            r="20"
            stroke="white"
            strokeWidth="4"
            fill="black"
             
          />
          <text
            fill="#ffffff"
            fontSize="30"
            textAnchor="middle"
            alignmentBaseline="middle"
            fontFamily="Verdana"
            x="25"
            y="25"
            
          >
            {this.props.letter}
          </text>
        </svg>
      </div>
    );
  }
}
