import React from "react";
import { Grid } from "react-bootstrap";
export const Qlist = function(props) {
  return <Grid fluid={true}>{props.listy}</Grid>;
};
