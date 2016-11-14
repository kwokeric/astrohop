import { merge } from 'lodash';

import {
  RECEIVE_SEARCH_RESULTS,
  receiveSearchResults } from '../actions/search_actions';

const SearchReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_SEARCH_RESULTS:
      return merge({}, action.results);
    default:
      return state;
  }
};

export default SearchReducer;
