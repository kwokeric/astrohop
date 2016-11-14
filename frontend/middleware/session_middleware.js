import { receiveCurrentUser,
         receiveErrors,
         LOGIN,
         LOGOUT,
         SIGNUP } from '../actions/session_actions';

import { fetchPlaylists } from '../actions/playlist_actions';

import { login, signup, logout } from '../util/session_api_util';

export default ({getState, dispatch}) => next => action => {
  const loginSuccess = user => {
    dispatch(receiveCurrentUser(user));
    dispatch(fetchPlaylists());
  };

  const signupSuccess = user => dispatch(receiveCurrentUser(user));
  const errorCallback = xhr => dispatch(receiveErrors(xhr.responseJSON));

  switch(action.type){
    case LOGIN:
      login(action.user, loginSuccess, errorCallback);
      return next(action);
    case LOGOUT:
      logout(() => next(action));
      return next(action);
    case SIGNUP:
      signup(action.user, signupSuccess, errorCallback);
      return next(action);
    default:
      return next(action);
  }
};
