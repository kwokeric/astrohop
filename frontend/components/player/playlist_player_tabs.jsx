import React from 'react';
import ReactPlayer from 'react-player';

var Modal = require("react-modal");

import Carousel from '../carousel/carousel_container';
import PlaylistEditFormContainer from '../playlist/playlist_edit_form_container';
import { playlistEditModalStyle } from '../../util/modal_styles.js';

class PlayerTabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {selectedTab: "playlist", modalOpen: false};
    this.isActive = this.isActive.bind(this);
	  this.openModal = this.openModal.bind(this);
	  this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  openModal() {
    this.setState({ modalOpen: true });
  }

  changeTab (tab) {
    return (e) => {
      e.preventDefault();
      this.setState({selectedTab: tab});
    };
  }

  isActive (tab) {
    return ((tab === this.state.selectedTab) ? "active" : "default" );
  }

  render() {
    let tab;

    if (this.state.selectedTab === "playlist") {
      tab = (
        <div className="playlist-tab">
          <div className="playlist-img">
            <img
            className="picture"
            src={this.props.currentPlaylist.image_url}/>
          </div>
          <div className="playlist-info">
            <ul>
              <li className="pl-title">{this.props.currentPlaylist.title}</li>
              <li className="pl-description">{this.props.currentPlaylist.description}</li>
            </ul>
          </div>
          <button
            className="btn-edit-playlist"
            onClick={this.openModal}>EDIT</button>
        </div>
      );
    } else if (this.state.selectedTab === "next") {
      let playlistVideos = this.props.currentMV.playlist_videos;

      tab = (
        <div className="next-tab">
          <Carousel videos={playlistVideos}/>
        </div>
      );
    } else if (this.state.selectedTab === "details") {
      tab = (
        <div className="detail-tab">
          <ul>
            <li className="details-li">Directed by: {this.props.currentMV.director}</li>
            <li className="details-li">Writers: {this.props.currentMV.writer}</li>
            <li className="details-li">Producers: {this.props.currentMV.producer}</li>
          </ul>
        </div>
      );
    }

    return (
      <section className="playlist-player-tabs-container">
        <ul className="tab-list">
          <li className={`playlist-tab ${this.isActive("playlist")}`} onClick={this.changeTab("playlist")}>PLAYLIST INFO</li>
          <li className={`next-tab ${this.isActive("next")}`} onClick={this.changeTab("next")}>UP NEXT</li>
          <li className={`details-tab ${this.isActive("details")}`} onClick={this.changeTab("details")}>DETAILS</li>
        </ul>

        {tab}

        <Modal
          className="playlist-modal"
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
          style={playlistEditModalStyle} >
          <PlaylistEditFormContainer
            playlist={this.props.currentPlaylist}
            closeModal={this.closeModal}/>
        </Modal>
      </section>
    );
  }
}

export default PlayerTabs;
