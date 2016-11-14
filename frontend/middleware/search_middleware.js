import {
  FETCH_SEARCH_RESULTS,
  receiveSearchResults } from '../actions/search_actions.js';

import { fetchSearchResults } from '../util/search_api_util.js';

export default ({getState, dispatch}) => next => action => {
  const fetchSearchResultsSuccess = videos => dispatch(receiveSearchResults(videos))

  switch (action.type) {
    case FETCH_SEARCH_RESULTS:
      fetchSearchResults(action.query, fetchSearchResultsSuccess);
      return next(action);
    default:
      return next(action);
  }
};
