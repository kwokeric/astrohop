export const FETCH_PLAYLISTS = "FETCH_PLAYLISTS";
export const CREATE_PLAYLIST = "CREATE_PLAYLIST";
export const UPDATE_PLAYLIST = "UPDATE_PLAYLIST";
export const DELETE_PLAYLIST = "DELETE_PLAYLIST";
export const ADD_PLAYLIST_MV = "ADD_PLAYLIST_MV";
export const DELETE_PLAYLIST_MV = "DELETE_PLAYLIST_MV";
export const RECEIVE_PLAYLISTS = "RECEIVE_PLAYLISTS";
export const RECEIVE_PLAYLIST = "RECEIVE_PLAYLIST";
export const RECEIVE_DELETED_PLAYLIST = "RECEIVE_DELETED_PLAYLIST";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";

export const fetchPlaylists = () => ({
  type: FETCH_PLAYLISTS
});

export const receivePlaylists = playlists => ({
  type: RECEIVE_PLAYLISTS,
  playlists
});

export const receivePlaylist = playlist => ({
  type: RECEIVE_PLAYLIST,
  playlist
});

export const receiveDeletedPlaylist = playlistId => ({
  type: RECEIVE_DELETED_PLAYLIST,
  playlistId
});

export const createPlaylist = playlist => ({
  type: CREATE_PLAYLIST,
  playlist
});

export const updatePlaylist = playlist => ({
  type: UPDATE_PLAYLIST,
  playlist
});

export const deletePlaylist = playlistId => ({
  type: DELETE_PLAYLIST,
  playlistId
});

export const addPlaylistMV = (playlistId, mvId) => ({
  type: ADD_PLAYLIST_MV,
  playlistId,
  mvId
});

export const deletePlaylistMV = (playlistId, mvId) => ({
  type: DELETE_PLAYLIST_MV,
  playlistId,
  mvId
});

export const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors
});
