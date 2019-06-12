import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./app";
 
import { BrowserRouter } from "react-router-dom";

/*
I used this link from github to deploy to
heroku create georges-timed-tables-react --buildpack https://github.com/mars/create-react-app-buildpack.git*/

class George extends React.Component {
  render() {
    return (
      <div>
         
        <App />
      </div>
    );
  }
}
ReactDOM.render(
  <BrowserRouter>
    <George />
  </BrowserRouter>,
  document.getElementById("root")
);