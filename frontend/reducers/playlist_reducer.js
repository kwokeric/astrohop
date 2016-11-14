import { merge } from 'lodash';

import {
  RECEIVE_PLAYLISTS,
  RECEIVE_PLAYLIST,
  RECEIVE_DELETED_PLAYLIST,
  RECEIVE_ERRORS } from '../actions/playlist_actions.js';

const _nullPlaylist = Object.freeze({
  playlists: [],
  errors: []
});

const PlaylistReducer = (state = _nullPlaylist, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_PLAYLISTS:
      return merge({}, state, { playlists: action.playlists });
    case RECEIVE_PLAYLIST:
      let playlistsCopy = [];
      state.playlists.forEach(playlist => {
        if (playlist.id !== action.playlist.id) {
          playlistsCopy.push(playlist);
        }
      });
      playlistsCopy.push(action.playlist);
      let newState = merge({}, state);
      newState.playlists = playlistsCopy;
      return newState;
    case RECEIVE_DELETED_PLAYLIST:
      let playlists = merge({}, state.playlists);
      delete playlists[action.playlistId];
      return merge({}, state, {playlists: playlists});
    case RECEIVE_ERRORS:
      const errors = action.errors;
      return merge({}, state, {errors});
    default:
      return state;
  }
};

export default PlaylistReducer;
