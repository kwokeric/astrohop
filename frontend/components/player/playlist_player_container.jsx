import { connect } from 'react-redux';

import PlaylistPlayer from './playlist_player';
import { incrementViewCount } from '../../actions/player_actions';

const mapStateToProps = ({ playlists, videos }, ownProps) => {
  let mvUrl = ownProps.params.mvUrl;
  let playlistId = parseInt(ownProps.params.playlistId);

  let currentPlaylist;
  playlists.playlists.forEach(playlist => {
    if (playlist.id === playlistId) {
      currentPlaylist = playlist;
    }
  });
  let currentMV;

  if (videos) {
    currentMV = videos[mvUrl];
  }

  return({
    videos,
    currentPlaylist,
    currentMV,
    mvUrl
  });
};

const mapDispatchToProps = (dispatch) => ({
  incrementViewCount: (mvUrl) => dispatch(incrementViewCount(mvUrl))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistPlayer);
