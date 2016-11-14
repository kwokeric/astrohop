import { connect } from 'react-redux';

import { fetchPlaylists } from '../../actions/playlist_actions';
import Carousel from './carousel';

const mapStateToProps = ({ playlists }, ownProps) => {
  return({
    playlists
  });
};

const mapDispatchToProps = (dispatch) => ({
  fetchPlaylists: () => dispatch(fetchPlaylists()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Carousel);
