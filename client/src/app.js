import React from "react";
import welcome from "./assets/images/welcome.jpg";
import success from "./assets/images/success.JPG";
import fail from "./assets/images/fail.JPG";
import { Switch, Route } from "react-router-dom";
import { Hangman } from "./components/hangman";
import { Qlist } from "./components/qlist.js";
import { StatList } from "./components/statList.js";
import { StartBox } from "./components/startBox";
import { Board } from "./components/board";
import { Question } from "./components/question";
import { CountdownClock } from "./components/countdownClock";
import "whatwg-fetch";
const API_PORT = process.env.PORT;
const url = "/api/stats";
//const url = "http://localhost:3001/api/stats";
const mySound = new Audio(
  "https://www.dropbox.com/s/stlordr82sdeqif/julien_matthey_bell_church_ring_6_o_clock.mp3?raw=1"
);
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
            render={props => <StatList listy={this.state.list} />}
          />
        </Switch>
      </main>
    );
  }
}

class Game extends React.Component {
  qlist = [];
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      duration: 0,
      qstate: [],
      started: false,
      numQs: null,
      time: null,
      messagePic: welcome,
      message: "Welcome",
      picStyle: "welcome",
      textStyle: "welcometext",
      avTime: 0,
      startTime: Date.now(),
      playerName: "",
      progress: null,
      start: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSlide = this.handleSlide.bind(this);
    this.step = this.step.bind(this);
  }

  step(timestamp) {
    if (!this.state.start) this.setState({ start: timestamp });
    this.setState({ progress: timestamp - this.state.start });

    if (
      this.state.started &&
      this.state.progress / 1000 < this.state.time * 60
    ) {
      window.requestAnimationFrame(this.step);
    }
    if (this.state.progress / 1000 > -10 + this.state.time * 60) {
      mySound.play();
    }
    if (this.state.progress / 1000 > this.state.time * 60) {
      this.gameOver("FAILLLLL", fail, "fail", "failtext");
    }
  }

  gameOver(mess, messPic, styley, txt) {
    var adjustedScore = this.state.score;
    adjustedScore += mess === "Success" ? 1 : 0;
    this.setState(
      {
        duration: ((Date.now() - this.state.startTime) / 1000).toFixed(2),
        score: adjustedScore,
        avTime: (
          (Date.now() - this.state.startTime) /
          1000 /
          adjustedScore
        ).toFixed(2)
      },
      () => {
        this.submitStat();

        this.setState(
          {
            message: mess,
            messagePic: messPic,
            score: 0,
            qstate: [],
            picStyle: styley,
            textStyle: txt,
            start: null,
            progress: null
          },
          () => {
            this.setState({ started: false });
          }
        );
      }
    );
  }
  handleChange(id, right) {
    if (right) {
      if (this.state.score === this.state.numQs - 1) {
        this.gameOver("Success", success, "success", "successtext");
        return;
      }
      this.setState({ score: this.state.score + 1 });
      var pos = this.state.score + 1;
      if (pos < this.state.numQs) {
        let qlist = this.state.qstate.slice(0);
        let newlyfocussedQ = (
          <Question
            focMe="autofocus"
            id={qlist[pos].props.id}
            x={qlist[pos].props.x}
            y={qlist[pos].props.y}
            answer={qlist[pos].props.answer}
            key={this.qlist.toString() + new Date()}
            handleChange={qlist[pos].props.handleChange}
          />
        );
        var newlist = this.state.qstate.slice(0, pos);
        newlist.push(newlyfocussedQ);
        this.setState({ qstate: newlist.concat(qlist.slice(pos + 1)) });
      }
    }
  }
  submitStat = () => {
    const { duration, numQs, score, playerName, avTime } = this.state;
    console.log(duration, numQs, score, playerName, avTime);
    var date = new Date(Date.now()).toLocaleString();
    fetch("/api/stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        duration,
        numQs,
        score,
        date,
        avTime,
        playerName
      })
    })
      .then(res => res.json())
      .then(res => {
        if (!res.success)
          this.setState({ error: res.error.message || res.error });
        else {
          this.props.getStats();
        }
      });
  };
  handleSubmit() {
    this.qlist.length = 0;

    for (var i = 0; i < this.state.numQs; i++) {
      var x = Math.floor(Math.random() * 5) + 7;
      var y = Math.floor(Math.random() * 12) + 2;
      var foc = i === 0 ? "autofocus" : "";

      this.qlist.push(
        <Question
          focMe={foc}
          id={i}
          x={String(x)}
          y={String(y)}
          answer={String(x * y)}
          key={this.qlist.toString()}
          handleChange={this.handleChange}
        />
      );
    }
    this.setState({ qstate: this.qlist, startTime: Date.now() }, () => {
      this.setState({ started: true });
    });
    window.requestAnimationFrame(this.step);
  }
  handleSlide(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function() {
      this.sound.play();
    };
    this.stop = function() {
      this.sound.pause();
    };
  }
  render() {
    if (!this.state.started) {
      console.log(this.state.time, this.state.progress);
      return (
        <div>
          <StartBox
            qvalue={this.state.numQs}
            timevalue={this.state.time}
            playername={this.state.playerName}
            onSubmit={this.handleSubmit}
            onChange={this.handleSlide}
            picture={this.state.messagePic}
            message={this.state.message}
            styley={this.state.picStyle}
            textstyle={this.state.textStyle}
          />
        </div>
      );
    } else {
      return (
        <div>
          <span className="rowC" id="instruments">
            <CountdownClock
              time={
                this.state.time * 60 - Math.ceil(this.state.progress / 1000)
              }
              limit={this.state.time * 60}
            />

            <div>
              {" "}
              <Hangman
                height="100px"
                deathNo={(this.state.progress / (this.state.time * 60000)) * 16}
              />
            </div>

            <Board
              col={
                "rgb(" +
                (255 - (255 / this.state.numQs) * this.state.score) +
                "," +
                (255 / this.state.numQs) * this.state.score +
                ",0)"
              }
              score={
                this.state.score === this.state.numQs ? "yay" : this.state.score
              }
            />
          </span>
          <div className="quiz">
            <Qlist listy={this.state.qstate} />
          </div>
        </div>
      );
    }
  }
}
