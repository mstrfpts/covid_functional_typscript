import React from "react";
import "./TableRows.css";

interface IProps {
  columns: any[];
}

const TableTitleColumns: React.FC<IProps> = (props) => {
  const { columns } = props;
  return (
    <div>
      <tr className={"TitleRow"}>
        {columns.map((col, index) => {
          return (
            <th key={`tableTitleColumns_${index}`} className={"Col"}>
              {col}
            </th>
          );
        })}
      </tr>
    </div>
  );
};

export default TableTitleColumns;
