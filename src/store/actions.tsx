export function fetchApi(defaultSortBy: string, dispatch: any) {
  dispatch(setFetchApiStarted());

  return function (dispatch: any) {
    fetch(`https://corona.lmao.ninja/v2/countries?sort=${defaultSortBy}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setFetchApiSuccess(data));
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

export function setFetchApiSuccess(data: any[]) {
  console.log("derd, in action success", data);

  return {
    type: "FETCH_API_SUCCESS",
    payload: { response: data },
  };
}

export function setFetchApiFailure(error: string) {
  return {
    type: "FETCH_API_FAILURE",
    payload: error,
  };
}

export function filterData(data: any[], searchTerm: string, dispatch: any) {
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
