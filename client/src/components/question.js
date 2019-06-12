import React from "react";
import { AnswerBox } from "./answerBox";
import { Animate } from "react-simple-animate";
export class Question extends React.Component {

  render() {
    return (
       
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
      
    );
  }
}

/*<Animate
play={true} // Toggle when animation should start
start={{
  transform: `translate(${(10-(this.props.y))*100}px,${(10-(this.props.x))*100}px)`
   
  
}}
end={{ transform: "translate(0px,0px)",}}
>
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
  </span></Animate>*/