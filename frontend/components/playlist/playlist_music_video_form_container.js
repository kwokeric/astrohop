import { connect } from 'react-redux';

import PlaylistMusicVideoForm from './playlist_music_video_form';
import { addPlaylistMV, deletePlaylistMV } from '../../actions/playlist_actions';

const mapStateToProps = ({ playlists }, ownProps) => ({
  playlists,
  myUrl: ownProps.mvUrl,
  closeModal: ownProps.closeModal
});

const mapDispatchToProps = (dispatch) => ({
  addToPlaylist: (playlistId, mvUrl) => dispatch(addPlaylistMV(playlistId, mvUrl)),
  removeFromPlaylist: (playlistId, mvUrl) => dispatch(deletePlaylistMV(playlistId, mvUrl)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistMusicVideoForm);
