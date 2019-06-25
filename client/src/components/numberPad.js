import React from "react";
import "../index.css";

import LetterButton from "./letterButton";
import {  Row, Col } from "react-bootstrap";
import Grid from '@material-ui/core/Grid';

const Numberpad = (props) => {
    
  return (
    <div >
      
    <div className="flex-grid" >
        <LetterButton handleLetterPress={props.handleLetterPress} letter={1} className="pad-col"/> 
         <LetterButton handleLetterPress={props.handleLetterPress} letter={2} className="pad-col" /> 
        <LetterButton handleLetterPress={props.handleLetterPress} letter={3} className="pad-col"/> </div> 
      
      
        <div className="flex-grid" >
         <LetterButton handleLetterPress={props.handleLetterPress} letter={4} className="pad-col"/> 
         <LetterButton handleLetterPress={props.handleLetterPress} letter={5} className="pad-col"/> 
        <LetterButton handleLetterPress={props.handleLetterPress} letter={6} className="pad-col"/> </div> 
      
      
        <div className="flex-grid">
          <LetterButton handleLetterPress={props.handleLetterPress} letter={7} className="pad-col"/> 
         <LetterButton handleLetterPress={props.handleLetterPress} letter={8} className="pad-col"/> 
          <LetterButton handleLetterPress={props.handleLetterPress} letter={9} className="pad-col"/> </div> 
      
          <div className="flex-grid">
          <LetterButton handleLetterPress={props.handleLetterPress} letter={"C"} className="pad-col" /> 
         <LetterButton handleLetterPress={props.handleLetterPress} letter={0} className="pad-col"/> 
          <LetterButton handleLetterPress={props.handleLetterPress} letter={"<"} className="pad-col" /> </div> 
      
    </div>
  );
};

export default Numberpad;
