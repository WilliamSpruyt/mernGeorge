import React from "react";
import { Table } from "react-bootstrap";
import { Header } from "./header"
import {
  BootstrapTable,
  TableHeaderColumn,
  TableHead
} from "react-bootstrap-table";

var Style = {
  color: "white"
};

export class StatList extends React.Component {
  render() {
    return (
      <div><Header />
      <BootstrapTable striped ref="table" data={this.props.listy} width="150">
        <TableHeaderColumn
          className="heado"
          dataField="playerName"
          dataAlign="center"
          dataSort={true}
          width="150"
        >
          Name
        </TableHeaderColumn>
        <TableHeaderColumn
          className="heado"
          dataField="date"
          dataAlign="center"
          isKey={true}
          dataSort={true}
          width="150"
        >
          Date
        </TableHeaderColumn>
        <TableHeaderColumn
          className="heado"
          dataField="score"
          dataAlign="center"
          dataSort={true}
        >
          Score
        </TableHeaderColumn>
        <TableHeaderColumn
          className="heado"
          dataField="duration"
          dataAlign="center"
          dataSort={true}
          width="150"
        >
          Time
        </TableHeaderColumn>
        <TableHeaderColumn
          className="heado"
          dataField="avTime"
          dataAlign="center"
          dataSort={true}
          width="150"
        >
          Average Time
        </TableHeaderColumn>
      </BootstrapTable></div>
    );
  }
}
/* <td>{ele.playerName}</td>
                      <td>{ele.date}</td>
                      <td>{ele.score}</td>
                      <td>{Math.round(ele.duration)}</td>
                      <td>{(ele.duration / ele.score).toFixed(2)}</td>*/
