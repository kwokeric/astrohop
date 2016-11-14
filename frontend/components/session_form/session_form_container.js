import { connect } from 'react-redux';
import { login, signup, clearErrors } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = ({ session }, ownProps) => ({
  loggedIn: Boolean(session.currentUser),
  errors: session.errors,
  closeModal: ownProps.closeModal
});

const mapDispatchToProps = (dispatch) => ({
  login: user => dispatch(login(user)),
  signup: user => dispatch(signup(user)),
  clearErrors: user => dispatch(clearErrors(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
