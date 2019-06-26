import React from 'react'
import { Animate } from "react-simple-animate";

const Right=(props)=>
 {
   const XTRANS=Math.round(Math.random()*1000)-500;
    return ( 
     
         
         
          <Animate
          play={props.anim} // Toggle when animation should start
          start={{
            transform: `translate(${0}px,${0}px)`,
            opacity: 1
             
            
          }}
          end={{ transform: `translate(${0}px,${300}px)`,
          opacity: 0     }}
          >
          <div className="Answer">
            {" "+props.value+" "}
            </div> </Animate>
        )
    
}

export default Right;