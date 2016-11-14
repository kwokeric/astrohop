import React from 'react';
import { hashHistory } from 'react-router';

import PlaylistCarousel from '../carousel/playlist_carousel.jsx';

class PlaylistIndex extends React.Component {
  constructor(props) {
    super(props);

    this.displayPlaylist = this.displayPlaylist.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler (playlist) {
    return (e) => {
      e.preventDefault();
      $(document).scrollTop(0);
      hashHistory.push(`/pl/${playlist.id}/mv/${playlist.music_videos[0].mv_url}`);
    };
  }

  displayPlaylist(idx, playlist) {
    return(
      <div className="playlist-item" key={`playlist-${idx}`}>
        <h1 className="playlist-title" onClick={this.clickHandler(playlist)}>{playlist.title}</h1>
        <PlaylistCarousel videos={playlist.music_videos} playlistId={playlist.id}/>
      </div>
    );
  }

  render () {
    if (this.props.playlists.playlists === null) {
      return (
        <div className="loading">
          <div className="loader">
            <svg className="circular" viewBox="25 25 50 50">
              <circle className="path" cx="50" cy="50" r="20" fill="none" />
            </svg>
          </div>
        </div>
      );
    } else {
      return(
        <div className="playlists-div">
          {Object.keys(this.props.playlists.playlists).map( idx => (
            this.displayPlaylist(idx, this.props.playlists.playlists[idx])
          ))}
        </div>
      );
    }
  }
}

export default PlaylistIndex;
