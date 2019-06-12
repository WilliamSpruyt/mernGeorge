import React from "react";
import { Grid } from "react-bootstrap";
import { Animate } from "react-simple-animate";
export const Qlist = function(props) {
  return <Animate
  play={props.play} // Toggle when animation should start
  start={{
    transform: "translate(-400px,-400px)",
     
    
  }}
  end={{ transform: "translate(0px,0px)",}}
>
  <div >{props.listy}</div>
</Animate>
};
 