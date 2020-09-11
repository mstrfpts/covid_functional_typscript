import { useSelector } from "react-redux";
import { IState } from "./reducer";

export function fetchApi(
  defaultSortBy: string,
  searchTerm: string,
  filteredData: any[],
  dispatch: any
) {
  dispatch(setFetchApiStarted());

  return function (dispatch: any) {
    fetch(`https://corona.lmao.ninja/v2/countries?sort=${defaultSortBy}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setFetchApiSuccess(data, searchTerm, filteredData));
      })
      .catch((err) => {
        dispatch(setFetchApiFailure(err.message));
      });
  };
}

export function setFetchApiStarted() {
  return {
    type: "FETCH_API_STARTED",
  };
}

export function setFetchApiSuccess(
  data: any[],
  searchTerm: string,
  filteredData: any[]
) {
  console.log("derd, in action success", data);

  return {
    type: "FETCH_API_SUCCESS",
    payload: {
      response: data,
      searchTerm: searchTerm,
      filteredData: filteredData,
    },
  };
}

export function setFetchApiFailure(error: string) {
  return {
    type: "FETCH_API_FAILURE",
    payload: error,
  };
}

export function filterData(data: any[], searchTerm: string) {
  let items = data.filter((item) => {
    return item.country.toLowerCase().search(searchTerm.toLowerCase()) !== -1;
  });
  return {
    type: "FILTER_DATA",
    payload: { response: items },
  };
}

export function updateSortBy(sortBy: string) {
  return {
    type: "UPDATE_SORTBY",
    payload: sortBy,
  };
}

export function updateSearchTerm(searchString: string) {
  return {
    type: "UPDATE_SEARCH_TERM",
    payload: searchString,
  };
}

export function updateCountryClicked(countryClicked: string) {
  return {
    type: "UPDATE_COUNTRY_CLICKED",
    payload: { countryClicked: countryClicked },
  };
}

export function updateHistoricalDataFetched(value: boolean) {
  return {
    type: "UPDATE_HISTORICAL_DATA_FETCHED",
    payload: value,
  };
}

export function updateCountryHistoricalData(data: object) {
  return {
    type: "UPDATE_COUNTRY_HISTORICAL_DATA",
    payload: data,
  };
}

export function updateCountryData(
  countryClicked: string,
  daysOfData: number,
  dispatch: any
) {
  dispatch(updateCountryClicked(countryClicked));

  return function (dispatch: any) {
    fetch(
      `https://corona.lmao.ninja/v2/historical/${countryClicked}?lastdays=${daysOfData}`
    )
      .then((response) => {
        if (response.ok) {
          dispatch(updateHistoricalDataFetched(true));
          return response.json();
        } else {
          dispatch(updateHistoricalDataFetched(true));
          throw new Error("Historical fetch failed/timeout");
        }
      })
      .then((json) => dispatch(updateCountryHistoricalData(json.timeline)))
      .catch((error) => {
        console.log(error);
      });
  };
}

export function updateDaysOfData(daysOfData: number) {
  return {
    type: "UPDATE_DAYS_OF_DATA",
    payload: daysOfData,
  };
}
