import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import SearchReducer from './search_reducer';
import PlayerReducer from './player_reducer';
import PlaylistReducer from './playlist_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  videos: PlayerReducer,
  playlists: PlaylistReducer,
  search: SearchReducer
});

export default RootReducer;
