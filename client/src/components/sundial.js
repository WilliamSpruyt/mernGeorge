import React from 'react';

const Sundial=(props)=>{
    return(
        <svg id="sundial" viewBox="0 0 100 100" height="auto" width="auto">
       
        <g  stroke-opacity="0.7" stroke-width="2"
       >
            
           <ellipse fill="rgb(40,40,40)" stroke="black" cx="50" cy="55" rx="40" ry="24" />
            <ellipse fill="darkolivegreen" stroke="black" cx="50" cy="50" rx="43" ry="25" />
            <path  id="shadow" fill="black"  fill-opacity="0.7" stroke="none" i d={`M69 63 L31 37 Q50 42.5 ${50+(43*(Math.cos(props.time*(Math.PI/props.limit))))} ${55+(25*(Math.sin(props.time*(Math.PI/props.limit))))} Z`} />
            <path id="gnomon" fill="gold" stroke="yellow" d="M69 63 L31 37 Q50 42.5 31 11 Z" />
             
    
        </g>
         
      </svg>

    )



}
export default Sundial;
