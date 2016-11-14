import { connect } from 'react-redux';
import { fetchSearchResults } from '../../actions/search_actions';
import Search from './search';

const mapStateToProps = (state) => ({
  videos: state.search
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
