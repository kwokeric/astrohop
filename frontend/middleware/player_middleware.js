import {
  receiveVideos,
  receiveVideo,
  receiveRelatedVideos,
  FETCH_VIDEOS,
  FETCH_RELATED_VIDEOS,
  INCREMENT_VIEW_COUNT } from '../actions/player_actions';

import {
  fetchVideos,
  fetchRelatedVideos,
  incrementViewCount } from '../util/player_api_util';

export default ({getState, dispatch}) => next => action => {
  const fetchVideosSuccess = videos => dispatch(receiveVideos(videos));
  const fetchRelatedVideosSuccess = video => dispatch(receiveRelatedVideos(video));

  switch(action.type){
    case FETCH_VIDEOS:
      fetchVideos(fetchVideosSuccess);
      break;
    case FETCH_RELATED_VIDEOS:
      fetchRelatedVideos(action.mvUrl, fetchRelatedVideosSuccess);
      break;
    case INCREMENT_VIEW_COUNT:
      incrementViewCount(action.mvUrl);
      break;
    default:
      return next(action);
  }
};
