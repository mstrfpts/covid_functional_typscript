export interface IState {
  data: any[];
  filteredData: any[];
  status: string;
  sortbySelectorValues: string[];
  sortBy: string;
  searchTerm: string;
  displayGraph: boolean;
  historicalDataFetched: boolean;
  countrySelected: string;
  countrySelectedData: any;
  countrySelectedHistoricalData: { cases: {}; deaths: {}; active: {} };
  daysOfData: number;
}

const initialState: IState = {
  status: "Idle",
  data: [],
  filteredData: [],
  sortbySelectorValues: ["Cases", "Active", "Deaths", "Country", "Tests"],
  sortBy: "cases",
  searchTerm: "",
  displayGraph: true,
  historicalDataFetched: true,
  countrySelected: "",
  countrySelectedData: {},
  countrySelectedHistoricalData: { cases: {}, deaths: {}, active: {} },
  daysOfData: 60,
};

function rootReducer(state = initialState, action: any) {
  console.log("derd, reducer", action);
  switch (action.type) {
    case "FETCH_API_STARTED":
      return Object.assign({}, state, { status: "Fetching Data..." });
    case "FETCH_API_FAILURE":
      return Object.assign({}, state, {
        status: "Error Fetching Data!",
        data: action.payload.response,
      });
    case "FETCH_API_SUCCESS":
      return Object.assign({}, state, {
        status: "Success",
        data: action.payload.response,
        filteredData:
          action.payload.searchTerm === ""
            ? action.payload.response
            : action.payload.filteredData,
      });
    case "FILTER_DATA":
      return Object.assign({}, state, {
        filteredData: action.payload.response,
      });
    case "UPDATE_SORTBY":
      return Object.assign({}, state, { sortBy: action.payload });
    case "UPDATE_SEARCH_TERM":
      return Object.assign({}, state, { searchTerm: action.payload });
    case "UPDATE_COUNTRY_CLICKED":
      return Object.assign({}, state, {
        countrySelected: action.payload.countrySelected,
        countrySelectedData: action.payload.countrySelectedData,
      });
    case "UPDATE_HISTORICAL_DATA_FETCHED":
      return Object.assign({}, state, {
        historicalDataFetched: action.payload,
      });
    case "UPDATE_COUNTRY_HISTORICAL_DATA":
      return Object.assign({}, state, {
        countrySelectedHistoricalData: action.payload,
      });
    case "UPDATE_DAYS_OF_DATA":
      return Object.assign({}, state, { daysOfData: action.payload });
    default:
      return state;
  }
}

export default rootReducer;
