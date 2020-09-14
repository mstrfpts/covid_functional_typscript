import React, { Component } from "react";
import "./TableRows.css";

const addCommasToNumber = (x: number) => {
  if (Number.isInteger(x)) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return 0;
  }
};

interface IProps {
  key: number;
  row: any;
  index: any;
  updateGraph: any;
  dispatch: any;
}

export const TableRows: React.FC<IProps> = (props) => {
  const { index, dispatch } = props;
  const {
    _id,
    country,
    cases,
    todayCases,
    deaths,
    todayDeaths,
    tests,
    active,
  } = props.row;
  const { flag } = props.row.countryInfo;

  const clickHandler = () => {
    props.updateGraph(country, dispatch);
  };

  return (
    <tr className={"row"} key={_id} onClick={clickHandler}>
      <td className={"column"}>
        {`${index + 1}. `}

        {<img src={flag} height={15} width={15} alt={flag} />}
        {` ${country}`}
      </td>
      <td className={"column"}>{`${addCommasToNumber(
        cases
      )} (+${addCommasToNumber(todayCases)})`}</td>
      <td className={"column"}>{addCommasToNumber(active)}</td>
      <td className={"column"}>{`${addCommasToNumber(
        deaths
      )} (+${addCommasToNumber(todayDeaths)})`}</td>
      <td className={"column"}>{`${addCommasToNumber(tests)}`}</td>
    </tr>
  );
};
