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

export function updateCountryClicked(
  countryClicked: string,
  countrySelectedData: any
) {
  return {
    type: "UPDATE_COUNTRY_CLICKED",
    payload: {
      countrySelected: countryClicked,
      countrySelectedData: countrySelectedData,
    },
  };
}

export function updateCountryHistoricalData(data: []) {
  console.log("historical dispatch action", data);
  return {
    type: "UPDATE_COUNTRY_HISTORICAL_DATA",
    payload: data,
  };
}

export function updateHistoricalDataDailyCount(data: {}) {
  return {
    type: "UPDATE_COUNTRY_HISTORICAL_DATA_DAILY_COUNT",
    payload: data,
  };
}

export function updateCountryData(
  countryClicked: string,
  data: any[],
  daysOfData: number,
  dispatch: any
) {
  let countrySelectedData = data.find(
    (element) => element.country === countryClicked
  );
  dispatch(updateCountryClicked(countryClicked, countrySelectedData));

  return function (dispatch: any) {
    fetch(
      `https://corona.lmao.ninja/v2/historical/${countryClicked}?lastdays=${daysOfData}`
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(updateCountryHistoricalData(data.timeline));
      })
      .catch((err) => {
        dispatch(setFetchApiFailure(err.message));
      });
  };
}

export function updateDaysOfData(daysOfData: number) {
  return {
    type: "UPDATE_DAYS_OF_DATA",
    payload: daysOfData,
  };
}

export function toggleGraphicalView() {
  return {
    type: "TOGGLE_GRAPHICAL_VIEW",
  };
}

export function updateGraphData(graphData: string) {
  return {
    type: "UPDATE_GRAPH_DATA",
    payload: graphData,
  };
}
