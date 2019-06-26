import React from 'react'


const AnswerBox=(props)=>
{ if(props.value){
    return (
      <div className="Answer">
         
          {" "+props.value+" "}
        </div>
    )}
    else return null;
}

export default AnswerBox;