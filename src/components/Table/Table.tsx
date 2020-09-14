import React from "react";
import { TableRows } from "./TableRows";
import TableTitleColumns from "./TableTitleColumns";
import "./TableRows.css";

interface IProps {
  columns: string[];
  heightSetter: any;
  filteredData: any[];
  updateGraph: any;
  dispatch: any;
}

const Table: React.FC<IProps> = (props) => {
  const { columns, heightSetter, filteredData, updateGraph } = props;
  return (
    <table id="Header" className={"Table"}>
      <TableTitleColumns columns={props.columns} />
      <div
        style={{
          height: props.heightSetter(),
        }}
        className={"Scroll"}
      >
        {props.filteredData.map((el, index) => (
          <TableRows
            key={index}
            row={el}
            index={index}
            updateGraph={props.updateGraph}
            dispatch={props.dispatch}
          />
        ))}
      </div>
    </table>
  );
};

export default Table;
