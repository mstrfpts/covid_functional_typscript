import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleGraphicalView,
  updateDaysOfData,
  updateGraphData,
} from "../store/actions";
import { IState } from "../store/reducer";
import { Chart } from "./Chart/Chart";
import "./MainPage.css";

interface IProps {}

const Graph: React.FC<IProps> = (props) => {
  const displayGraph = useSelector((state: IState) => state.displayGraph);
  const countrySelected = useSelector((state: IState) => state.countrySelected);
  const countrySelectedHistoricalData = useSelector(
    (state: IState) => state.countrySelectedHistoricalData
  );
  const countrySelectedHistoricalDataDailyCount = useSelector(
    (state: IState) => state.countrySelectedHistoricalDataDailyCount
  );
  const graphData = useSelector((state: IState) => state.graphData);
  const daysOfData = useSelector((state: IState) => state.daysOfData);
  const graphDataOptions = ["Cases", "Deaths"];
  const graphDaysOptions = [
    1,
    2,
    3,
    4,
    5,
    10,
    20,
    30,
    45,
    60,
    75,
    90,
    120,
    150,
    180,
    210,
    240,
    260,
    300,
  ];
  const dispatch = useDispatch();

  const toggleView = () => {
    dispatch(toggleGraphicalView());
  };

  const graphDataChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    dispatch(updateGraphData(event.target.value));
  };

  const daysOfDataChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    console.log("derd, days change handler", event.target.value);
    dispatch(updateDaysOfData(parseInt(event.target.value)));
  };

  return (
    <div>
      <div className={"countryStats"}>
        <div className={"graphDisplay"}>
          {displayGraph ? (
            <button onClick={toggleView}>Close Graphical View</button>
          ) : (
            <button onClick={toggleView}>Show Graphical View</button>
          )}
        </div>

        {displayGraph ? (
          countrySelected &&
          Object.keys(countrySelectedHistoricalDataDailyCount).length ? (
            <div className={"gContainer"}>
              <Chart
                country={countrySelected}
                historicalData={
                  graphData === "Cases"
                    ? countrySelectedHistoricalDataDailyCount.cases
                    : countrySelectedHistoricalDataDailyCount.deaths
                }
                parameter={`Daily ${graphData}`}
                color={graphData === "Cases" ? "blue" : "red"}
              />
              <Chart
                country={countrySelected}
                historicalData={
                  graphData === "Cases"
                    ? countrySelectedHistoricalData.cases
                    : countrySelectedHistoricalData.deaths
                }
                parameter={`Total ${graphData}`}
                color={graphData === "Cases" ? "blue" : "red"}
              />
            </div>
          ) : (
            <div className={"graphPlaceHolder"}>
              {countrySelectedHistoricalData.cases ? `Awaiting ` : `No `}
              Graphical Information
            </div>
          )
        ) : null}
        {displayGraph ? (
          <div className={"daysDropDown"}>
            <label className={"graphDropdownLabel"}>Graph data on:</label>
            <select
              className={"graphDropdown"}
              id="graphData"
              onChange={graphDataChangeHandler}
              defaultValue={graphData}
            >
              {graphDataOptions.map((value, index) => {
                return (
                  <option key={index} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>
            <label>Days:</label>
            <select
              id="graphDays"
              onChange={daysOfDataChangeHandler}
              defaultValue={daysOfData}
            >
              {graphDaysOptions.map((value, index) => {
                return (
                  <option key={index} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Graph;
