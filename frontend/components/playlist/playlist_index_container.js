import { connect } from 'react-redux';

import PlaylistIndex from './playlist_index';

const mapStateToProps = ({ playlists }, ownProps) => ({
    playlists
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistIndex);
