import React from 'react';

import PlaylistMusicVideoFormContainer from '../playlist/playlist_music_video_form_container';

class PlaylistMusicVideoForm extends React.Component {
  constructor(props) {
    super(props);

    this.displayPlaylistItem = this.displayPlaylistItem.bind(this);
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
  }

  add(playlistId, mvUrl) {
    return( (e) => this.props.addToPlaylist(playlistId, mvUrl));
  }

  remove(playlistId, mvUrl) {
    return( (e) => this.props.removeFromPlaylist(playlistId, mvUrl));
  }

  displayPlaylistItem(playlist) {
    let button;

    if (playlist.music_videos.map(mv => mv.mv_url).includes(this.props.mvUrl)) {
      button = (
                 <a className="mv-btn remove"
                   onClick={this.remove(playlist.id, this.props.mvUrl)}>
                   REMOVE
                 </a>
               );
    } else {
      button = (
                 <a className="mv-btn add"
                   onClick={this.add(playlist.id, this.props.mvUrl)}>
                   ADD
                 </a>
               );
    }

    return(
      <li className="playlist-list-item" key={`${playlist.title}-${playlist.id}`}>
        <div className="playlist-title">{playlist.title}</div>
        {button}
      </li>
    );
  }

  render () {
    let playlists = this.props.playlists.playlists.sort(function(a,b) { return parseInt(a.id) - parseInt(b.id); } );

    return(
      <div className="playlist-mv-modal-div">
        <div className="title-div">ADD TO PLAYLIST</div>

        <div className="playlist-mv-form">
          <ul>
            {Object.keys(playlists).map( idx => this.displayPlaylistItem(playlists[idx]))}
          </ul>
          <button className="button-close" onClick={this.props.closeModal.bind(this)}>DONE</button>
        </div>
      </div>
    );
  }
}

export default PlaylistMusicVideoForm;
