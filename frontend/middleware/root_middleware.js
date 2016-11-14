import { applyMiddleware } from 'redux';

import SessionMiddleware from '../middleware/session_middleware';
import PlayerMiddleware from '../middleware/player_middleware';
import SearchMiddleware from '../middleware/search_middleware';
import PlaylistMiddleware from '../middleware/playlist_middleware';

import createLogger from 'redux-logger';

const loggerMiddleware = createLogger();

const RootMiddleware = applyMiddleware(
  SessionMiddleware,
  PlayerMiddleware,
  SearchMiddleware,
  PlaylistMiddleware,
  loggerMiddleware
);

export default RootMiddleware;
