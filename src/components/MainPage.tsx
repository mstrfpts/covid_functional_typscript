import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchApi,
  filterData,
  updateSortBy,
  updateCountryData,
} from "../store/actions";
import { IState } from "../store/reducer";
import { getPropCount } from "./counts";
import Search from "./Search";
import Table from "./Table/Table";
import SortbySelector from "./SortbySelector";
import "./MainPage.css";

const MainPage = () => {
  const state = useSelector((state: IState) => state);
  const data = useSelector((state: IState) => state.data);
  const filteredData = useSelector((state: IState) => state.filteredData);
  const sortbySelectorValues = useSelector(
    (state: IState) => state.sortbySelectorValues
  );
  const sortBy = useSelector((state: IState) => state.sortBy);
  const searchTerm = useSelector((state: IState) => state.searchTerm);
  const daysOfData = useSelector((state: IState) => state.daysOfData);

  let tableColumns = [
    "Country",
    "Cases(+new)",
    "Active",
    "Deaths(+new)",
    "Tests",
  ];
  const dispatch = useDispatch();

  console.log("derd, state", state);
  console.log("derd, filteredData", filteredData);

  useEffect(() => {
    document.title = "Coronavirus tracker";
    dispatch(fetchApi(sortBy, searchTerm, filteredData, dispatch));
  }, [sortBy]);

  useEffect(() => {
    dispatch(filterData(data, searchTerm));
    if (data.length) {
      updateGraph(data[0].country);
    }
  }, [searchTerm, data]);

  const scrollHeightSetter = () => {
    let scrollHeight =
      /*this.state.displayGraph
      ? window.innerHeight - 300
      : */ window.innerHeight -
      220;

    return scrollHeight;
  };

  const sortListChangeHandler = (value: string) => {
    let sortTerm = value.toLowerCase();
    if (sortTerm === "country") {
      sortTerm = sortTerm + "asc";
    }
    dispatch(updateSortBy(sortTerm));
  };

  const updateGraph = (countryClicked: string) => {
    dispatch(updateCountryData(countryClicked, data, daysOfData, dispatch));
  };

  return (
    <div className={"imageContainer"}>
      {filteredData ? (
        //If you use status === 'SUCCESS',
        //it would reload the entire page even on refresh
        <div>
          <div className="Header">
            <div className={"Title"}>CoVid-19</div>
            <div className={"MajorCounts"}>
              <div>{`Total Cases: ${getPropCount(filteredData, "cases")}`}</div>
              <div>{`Active: ${getPropCount(filteredData, "active")}`}</div>
              <div>
                {" "}
                {`Recovered: ${getPropCount(filteredData, "recovered")}`}
              </div>
              <div> {`Deaths: ${getPropCount(filteredData, "deaths")}`}</div>
            </div>
          </div>
          <div className={"TableContainer"}>
            <div className={"Search"}>
              <Search />
              <SortbySelector
                selectorValues={sortbySelectorValues}
                defaultSortBy={sortBy}
                changeHandler={sortListChangeHandler}
              />
            </div>
            <Table
              columns={tableColumns}
              heightSetter={scrollHeightSetter}
              filteredData={filteredData}
              updateGraph={updateGraph}
            />
          </div>
        </div>
      ) : (
        <div className={"Header Title"}>Loading...</div>
      )}
    </div>
  );
};

export default MainPage;
