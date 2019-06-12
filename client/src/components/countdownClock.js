import React from "react";

 
export class CountdownClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      progress: 0,
      hangstring:"",
    };
    this.state={
      
    }
  }
    secondsToHms(d) {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
    
         
        var mDisplay = m < 10 ? "0"+m  : m;
        var sDisplay =  s < 10 ? "0"+s  : s;
        return mDisplay +":"+ sDisplay; 
    }
    render() {
          
        return (<div>
          <svg id="score" width="100" height="100">
            <circle
              cx="50"
              cy="50"
              r="46"
              stroke="none"
              strokeWidth="4"
              fill="white"
            />
            <text
              fill="#000000"
              fontSize="30"
              textAnchor="middle"
              alignmentBaseline="middle"
              fontFamily="Verdana"
              x="50"
              y="50"
            >
              {this.secondsToHms(this.props.time)}
            </text>

          </svg>
         
           </div>
        );
      }
    }

