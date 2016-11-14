import {
  FETCH_PLAYLISTS,
  FETCH_PLAYLIST,
  CREATE_PLAYLIST,
  UPDATE_PLAYLIST,
  DELETE_PLAYLIST,
  ADD_PLAYLIST_MV,
  DELETE_PLAYLIST_MV,
  receivePlaylists,
  receivePlaylist,
  receiveDeletedPlaylist,
  receiveErrors } from '../actions/playlist_actions';

import {
  fetchPlaylists,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  addPlaylistMV,
  deletePlaylistMV } from '../util/playlist_api_util';

  import {hashHistory} from 'react-router';

export default ({getState, dispatch}) => next => action => {
  const fetchPlaylistsSuccess = playlists => dispatch(receivePlaylists(playlists));
  const receivePlaylistSuccess = playlist => dispatch(receivePlaylist(playlist));
  const deletePlaylistSuccess = playlistId => dispatch(receiveDeletedPlaylist(playlistId));
  const receivePlaylistMVSuccess = playlist => dispatch(receivePlaylist(playlist));
  const deletePlaylistMVSuccess = playlist => {
    dispatch(receivePlaylist(playlist));
    hashHistory.push('/');
  };
  const errorCallback = xhr => dispatch(receiveErrors(xhr.responseJSON));

  switch(action.type){
    case FETCH_PLAYLISTS:
      fetchPlaylists(fetchPlaylistsSuccess);
      return next(action);
    case CREATE_PLAYLIST:
      createPlaylist(action.playlist, receivePlaylistSuccess, errorCallback);
      return next(action);
    case UPDATE_PLAYLIST:
      updatePlaylist(action.playlist, receivePlaylistSuccess, errorCallback);
      return next(action);
    case DELETE_PLAYLIST:
      deletePlaylist(action.playlistId, deletePlaylistSuccess);
      return next(action);
    case ADD_PLAYLIST_MV:
      addPlaylistMV(action.playlistId, action.mvId, receivePlaylistMVSuccess, errorCallback);
      return next(action);
    case DELETE_PLAYLIST_MV:
      deletePlaylistMV(action.playlistId, action.mvId, deletePlaylistMVSuccess, errorCallback);
      return next(action);
    default:
      return next(action);
  }
};
