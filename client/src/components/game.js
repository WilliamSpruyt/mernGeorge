import React from "react";
import welcome from "../assets/images/welcome.jpg";
import success from "../assets/images/success.JPG";
import fail from "../assets/images/fail.JPG";
import { Switch, Route } from "react-router-dom";
import AnswerBox from "./answerBoxLite";
import { Qlist } from "./qlist.js";
import { StatList } from "./statList.js";
import { StartBox } from "./startBox";
import { Board } from "./board";
import { Question } from "./question";
import { Jumbotron } from "react-bootstrap";
import "../index.css";
import { MdThumbsUpDown } from "react-icons/lib/md";
import Sundial from "./sundial";
import Numberpad from "./numberPad";
const mySound = new Audio(
  "https://www.dropbox.com/s/stlordr82sdeqif/julien_matthey_bell_church_ring_6_o_clock.mp3?raw=1"
);

export class Game extends React.Component {
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
      start: null,
      answerbox: ""
    };

    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSlide = this.handleSlide.bind(this);
    this.handleLetterPress = this.handleLetterPress.bind(this);
    this.step = this.step.bind(this);
  }
componentDidMount(){
  document.addEventListener("keydown", this._handleKeyDown);
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
  _handleKeyDown = (event) => {
    console.log(event.keyCode)
  if(this.state.started && (event.keyCode===8 || event.keyCode===46) )  this.handleLetterPress("<")
  if(this.state.started && (event.key==="0" ||  Number(event.key)) )  {
    this.handleLetterPress(event.key)
  }
}
  gameOver(mess, messPic, styley, txt) {
    console.log(mess,"success of sorts part2")
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
            progress: null,
            answerbox:""
          },
          () => {
            this.setState({ started: false });
          }
        );
      }
    );
  }
  handleLetterPress(letter) {
    if (letter === "C") {
      this.setState({ answerbox: "" });
    }
    if (letter === "<" && this.state.answerbox.length > 0) {
      this.setState({
        answerbox: this.state.answerbox.slice(
          0,
          this.state.answerbox.length - 1
        )
      });
    } else if (letter !== "<") {
      this.setState({ answerbox: this.state.answerbox + letter }, () => {
        if (
          this.state.answerbox === this.state.qstate[this.state.score].answer
        ) {
          if (this.state.score === this.state.numQs - 1) {
            console.log(this.state.score,this.state.numQs,"success of sorts")
            this.gameOver("Success", success, "success", "successtext");
            return;
          }
          this.setState({ score: this.state.score + 1, answerbox: "" });
          console.log(this.state.score,this.state.numQs,"Why happen?")
        }
      });
    }
  }
   
  submitStat = () => {
    const { duration, numQs, score, playerName, avTime } = this.state;

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

      this.qlist.push({
        id: i,
        x: String(x),
        y: String(y),
        answer: String(x * y)
      });
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
      return (
        <div >
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
        <div  >
           
            
              <Sundial
                 
                time={this.state.time * 60 - this.state.progress / 1000}
                limit={this.state.time * 60}
                countTime={
                  this.state.time * 60 - Math.ceil(this.state.progress / 1000)
                }
              />
             
         
          <div style={{ borderStyle: "solid" }}>
            <div className="quiz">
              <Board
                col={
                  "rgb(" +
                  (255 - (255 / this.state.numQs) * this.state.score) +
                  "," +
                  (255 / this.state.numQs) * this.state.score +
                  ",0)"
                }
                score={
                  this.state.score === this.state.numQs
                    ? "yay"
                    : this.state.numQs - this.state.score
                }
              />
              <div>
                {" "}
                {this.state.qstate[this.state.score]  && <Question
                  id={this.state.qstate[this.state.score].id}
                  x={this.state.qstate[this.state.score].x}
                  y={this.state.qstate[this.state.score].y}
                  answer={this.state.qstate[this.state.score].answer}
                  key={this.state.qstate[this.state.score].id}
                  handleLetterpress={this.handleLetterpress}
                  answerbox={this.state.answerbox}
                />}
              </div>
              <AnswerBox
                value={this.state.answerbox}
                handleLetterpress={this.handleLetterpress}
              />{" "}
            </div>
            <div className="quiz">
              <Numberpad handleLetterPress={this.handleLetterPress} />{" "}
            </div>
          </div>
        </div>
      );
    }
  }
}
