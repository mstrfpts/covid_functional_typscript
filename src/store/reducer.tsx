export interface IState {
  data: object[];
  filteredData: object[];
  status: string;
  sortbySelectorValues: string[];
  sortBy: string;
}

const initialState: IState = {
  status: "Idle",
  data: [],
  filteredData: [],
  sortbySelectorValues: ["Cases", "Active", "Deaths", "Country", "Tests"],
  sortBy: "cases",
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
        filteredData: action.payload.response,
      });
    case "FILTER_DATA":
      return Object.assign({}, state, {
        filteredData: action.payload.response,
      });
    case "UPDATE_SORTBY":
      return Object.assign({}, state, { sortBy: action.payload });
    default:
      return state;
  }
}

export default rootReducer;
