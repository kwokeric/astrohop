import { connect } from 'react-redux';

import PlaylistEditForm from './playlist_edit_form';
import { updatePlaylist, deletePlaylist } from '../../actions/playlist_actions';

const mapStateToProps = ({ playlists }, ownProps) => ({
  playlist: ownProps.playlist,
  errors: playlists.errors,
  closeModal: ownProps.closeModal
});

const mapDispatchToProps = (dispatch) => ({
  updatePlaylist: (playlist) => dispatch(updatePlaylist(playlist)),
  deletePlaylist: (playlistId) => dispatch(deletePlaylist(playlistId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistEditForm);
