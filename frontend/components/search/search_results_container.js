import { connect } from 'react-redux';

import SearchResults from './search_results.jsx';

const mapStateToProps = state => ({
  results: state.search
});

export default connect(
  mapStateToProps
)(SearchResults);
