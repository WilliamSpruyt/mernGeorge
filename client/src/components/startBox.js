import React from "react";

import { Header } from "./header";
import { Modal, FormControl, Row, Grid, Col } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import "../index.css";
const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    enterDelay: 3000,
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(40)
  }
}))(Tooltip);
const useStyles = makeStyles({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

export class StartBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: makeStyles(),
      unready: true
    };
  }

  render() {
    return (
      <Modal {...this.props} show={true} dialogClassName="custom-modal">
        <div className="wrapper">
          <Header className="Header" />
          <span className="titletext">George's Timed Tables</span>
          <img
            className={this.props.styley}
            id="pic"
            //src="https://www.dropbox.com/s/7vh6wrht05329dh/12042011%20032.jpg?raw=1"

            src={this.props.picture}
            alt={this.props.message}
          />
          <div id="titlediv" className={this.props.textstyle}>
            {this.props.message}
          </div>

          <form>
            <Grid fluid={true} style={{ margin: "5%" }}>
              <Row>
                <Col {...this.props} xs={6} md={4}>
                  <FormControl
                    id="timeForm"
                    placeholder="Time"
                    name="time"
                    type="number"
                    value={this.props.timevalue}
                    min="1"
                    max="10"
                    step="1"
                    onChange={this.props.onChange}
                  />
                  <HtmlTooltip title="How long do you need in minutes?">
                    <span>
                      {" "}
                      <FontAwesomeIcon
                        icon={faQuestionCircle}
                        className="infoIcon"
                      />
                    </span>
                  </HtmlTooltip>
                </Col>

                <Col {...this.props} xs={6} md={4}>
                  <FormControl
                    placeholder="Number of Questions"
                    name="numQs"
                    type="number"
                    value={this.props.qvalue}
                    min="2"
                    max="100"
                    step="5"
                    onChange={this.props.onChange}
                  />

                  <HtmlTooltip title="How many questions do you want?">
                    <span>
                      {" "}
                      <FontAwesomeIcon
                        icon={faQuestionCircle}
                        className="infoIcon"
                      />
                    </span>
                  </HtmlTooltip>
                </Col>
                <Col {...this.props} xs={6} md={4}>
                  <FormControl
                    placeholder="What's your name?"
                    name="playerName"
                    value={this.props.playername}
                    onChange={this.props.onChange}
                  />
                  <HtmlTooltip title="Give us a name for this session">
                    <span>
                      {" "}
                      <FontAwesomeIcon
                        icon={faQuestionCircle}
                        className="infoIcon"
                      />
                    </span>
                  </HtmlTooltip>
                </Col>
              </Row>{" "}
            </Grid>
            <Button
              type="submit"
              disabled={this.props.qvalue < 1 || this.props.timevalue < 1}
              variant="contained"
              color={
                this.props.qvalue > 1 && this.props.timevalue >= 1
                  ? "primary"
                  : "default"
              }
              size="large"
              onClick={
                this.props.qvalue > 1 && this.props.timevalue >= 1
                  ? this.props.onSubmit
                  : null
              }
            >
              Start
            </Button>
          </form>
        </div>
      </Modal>
    );
  }
}
