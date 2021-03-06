import React from "react";

import { Animate } from "react-simple-animate";
const Question =(props)=> {

  
    return (
      <Animate
      play={true} // Toggle when animation should start
      start={{
        transform: `translate(${-300}px,${-300}px)`
         
        
      }}
      end={{ transform: "translate(0px,0px)",}}
      >
        <span>
          <div className="question">
            {props.x} {"\u00D7"} {props.y}{"="}
         
          </div>
        </span> </Animate>
      
    );
    
  }

  export default Question;
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