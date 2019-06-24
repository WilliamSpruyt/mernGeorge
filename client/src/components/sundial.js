import React from 'react';
const secondsToHms=(d)=> {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

     
    var mDisplay = m < 10 ? "0"+m  : m;
    var sDisplay =  s < 10 ? "0"+s  : s;
    return mDisplay +":"+ sDisplay; 
}
const Sundial=(props)=>{
    
    
    return(
        <svg id="sundial" style={{backgroundColor:`rgb(0,0,${255*(Math.sin(props.time*(Math.PI/props.limit)))})`}} viewBox="0 0 100 100" height="auto" width="auto">
       
        <g stroke-opacity="0.7" stroke-width="2"
       >
       <ellipse fill={`rgb(255,${255*(Math.sin(props.time*(Math.PI/props.limit)))},0)`} stroke="none" cx={50+(50*(Math.cos(props.time*(Math.PI/props.limit))))} cy={35-(30*(Math.sin(props.time*(Math.PI/props.limit))))} rx="5" ry="5" />
       <path fill="green" d="M 0 50 L 100 50 L 100 25 Q 75 25 50 50 Q 25 15 -25 50"/>
       <path fill="darkgreen" d="M 0 50 L 100 50 L 100 100 L 0 100 L 0 50"/>
           <ellipse fill="rgb(40,40,40)" stroke="black" cx="50" cy="55" rx="40" ry="24" />
            <ellipse fill="darkolivegreen" stroke="black" cx="50" cy="50" rx="43" ry="25" />
            <path  id="shadow" fill="black"  fill-opacity="0.7" stroke="none" i d={`M69 63 L31 37 Q50 42.5 ${50-(43*(Math.cos(props.time*(Math.PI/props.limit))))} ${55+(25*(Math.sin(props.time*(Math.PI/props.limit))))} Z`} />
            <path id="gnomon" fill="gold" stroke="yellow" d="M69 63 L31 37 Q50 42.5 31 11 Z" />
            
    
        </g>
        <text
        fill="#000000"
        fontSize="30"
        textAnchor="middle"
        alignmentBaseline="middle"
        fontFamily="Verdana"
        x="50"
        y="50"
      >
        {secondsToHms(props.countTime)}
      </text>
      </svg>

    )



}
export default Sundial;
