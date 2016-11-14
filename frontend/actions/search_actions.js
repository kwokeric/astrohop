export const FETCH_SEARCH_RESULTS = "FETCH_SEARCH_RESULTS";
export const RECEIVE_SEARCH_RESULTS = "RECEIVE_SEARCH_RESULTS";

export const fetchSearchResults = query => ({
  type: FETCH_SEARCH_RESULTS,
  query
});

export const receiveSearchResults = results => ({
  type: RECEIVE_SEARCH_RESULTS,
  results
});
