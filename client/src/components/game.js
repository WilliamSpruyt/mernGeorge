import React from "react";
import welcome from "../assets/images/welcome.jpg";
import success from "../assets/images/success.JPG";
import fail from "../assets/images/fail.JPG";
import { Switch, Route } from "react-router-dom";
import { Hangman } from "./hangman"
import { Qlist } from "./qlist.js"
import { StatList } from "./statList.js"
import { StartBox } from "./startBox"
import { Board } from "./board"
import { Question } from "./question";
import { CountdownClock } from "./countdownClock";
import "../index.css";
import { MdThumbsUpDown } from "react-icons/lib/md";
import Sundial from "./sundial";

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
         
    }}
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
              
  
              <div>
                {" "}
                <Sundial height="100%"  time={
                  this.state.time * 60 -(this.state.progress / 1000)
                } limit={this.state.time * 60}
                countTime={
                  this.state.time * 60 - Math.ceil(this.state.progress / 1000)
                }
                />
              </div>
  
              
            </span>
            <div className="quiz">
              <Qlist listy={this.state.qstate[this.state.score]} qnum={this.state.score} play={true} />
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
          </div>
        );
      }
    }
  }