import { connect } from 'react-redux';
import { login, signup, logout, clearErrors } from '../../actions/session_actions';
import { fetchSearchResults } from '../../actions/search_actions';
import Header from './header';

const mapStateToProps = ({ session, videos }) => ({
  currentUser: session.currentUser,
  videos
});

const mapDispatchToProps = dispatch => ({
  search: query => dispatch(fetchSearchResults(query)),
  signup: (user) => dispatch(signup(user)),
  login: (user) => dispatch(login(user)),
  logout: () => dispatch(logout()),
  clearErrors: () => dispatch(clearErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
