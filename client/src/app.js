import React from "react";
 
import { Switch, Route } from "react-router-dom";
import {Game} from "./components/game";
 
import { StatList } from "./components/statList.js";
 
import "whatwg-fetch";
const API_PORT = process.env.PORT;
const url = "/api/stats";
//const url = "http://localhost:3001/api/stats";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      progress: 0
    };
    this.loadStatsFromServer = this.loadStatsFromServer.bind(this);
  }
  componentDidMount() {
    this.loadStatsFromServer();
  }

  loadStatsFromServer = () => {
    // fetch returns a promise. If you are not familiar with promises, see
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
    fetch(url)
      .then(data => data.json())
      .then(res => {
        if (!res.success) this.setState({ error: res.error });
        else this.setState({ list: res.data });
        console.log("Howdy");
      });
  };
  render() {
    return (
      <main>
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Game
                getStats={this.loadStatsFromServer}
                stats={this.state.list}
              />
            )}
          />

          <Route
            exact
            path="/stats"
            render={props => <StatList listy={this.state.list} play="true" />}
          />
        </Switch>
      </main>
    );
  }
}


