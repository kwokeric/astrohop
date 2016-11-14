import React from 'react';
import ReactPlayer from 'react-player';

var Modal = require("react-modal");

import PlaylistPlayerTabs from './playlist_player_tabs';
import PlaylistMusicVideoFormContainer from '../playlist/playlist_music_video_form_container';
import { playlistModalStyle } from '../../util/modal_styles.js';

class PlaylistPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { modalOpen: false };
	  this.openModal = this.openModal.bind(this);
	  this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount () {
    this.props.incrementViewCount(this.props.params.mvUrl);
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  openModal() {
    this.setState({ modalOpen: true });
  }

  numberWithCommas (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  videoInfo () {
    return(
      <div className="video-info-container">
        <ul className="video-info">
          <li>{this.props.currentMV.song_title}</li>
          <li>{this.props.currentMV.artist_name}</li>
        </ul>

        <ul className="video-info-more">
          <li className="add-to" onClick={this.openModal}><div className="plus">+</div> Add</li>
          <li>{this.numberWithCommas(this.props.currentMV.view_count)} <span className="small-text">Views</span></li>
        </ul>
      </div>
    );
  }

  render () {
    if (this.props.currentMV === undefined || this.props.currentPlaylist === undefined) {
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
        <div className="mv-div">
          <div className="player-div">
            <iframe
              className="player"
              src={`https://www.youtube.com/embed/${this.props.params.mvUrl}?autoplay=1&showinfo=0&modestbranding=1&rel=0`} />
          </div>

          {this.videoInfo()}

          <Modal
            className="playlist-mv-modal"
  					isOpen={this.state.modalOpen}
  					onRequestClose={this.closeModal}
            style={playlistModalStyle} >
            <PlaylistMusicVideoFormContainer
              mvUrl={this.props.mvUrl}
              closeModal={this.closeModal}/>
          </Modal>

          <PlaylistPlayerTabs
            currentPlaylist={this.props.currentPlaylist}
            currentMV={this.props.currentMV}
            videos={this.props.currentPlaylist.videos} />
        </div>
      );
    }
  }
}

export default PlaylistPlayer;
