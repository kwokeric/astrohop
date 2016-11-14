import { connect } from 'react-redux';
import { login, signup, logout } from '../../actions/session_actions';
import Profile from './profile';

const mapStateToProps = ({ session, playlists }) => ({
  currentUser: session.currentUser,
  playlists: playlists.playlists
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
