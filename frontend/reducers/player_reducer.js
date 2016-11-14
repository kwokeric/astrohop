import merge from 'lodash/merge';

import { RECEIVE_VIDEOS, RECEIVE_RELATED_VIDEOS } from '../actions/player_actions';

const PlayerReducer = (state = {}, action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_VIDEOS:
      let videos = action.videos;
      return merge({}, videos);
    case RECEIVE_RELATED_VIDEOS:
      let mvUrl = Object.keys(action.videos)[0];
      let video = merge({}, state[mvUrl]);
      video["related_videos"] = action.videos[mvUrl];
      return merge({}, state, {[video.mv_url]: video});
    default:
      return state;
  }
};

export default PlayerReducer;
