import React from 'react';
import { hashHistory, Link } from 'react-router';

var Modal = require("react-modal");

import PlaylistIndexContainer from '../playlist/playlist_index_container';
import PlaylistFormContainer from '../playlist/playlist_form_container';
import { playlistModalStyle } from '../../util/modal_styles.js';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = { playlistModalOpen: false };
    this.openModal = this.openModal.bind(this);
	  this.closeModal = this.closeModal.bind(this);
    this.updateImage = this.updateImage.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.playlists && this.props.playlists.length < newProps.playlists.length) {
      this.closeModal();
    }
  }

  showUploadBtn() {
    $(".upload-img-btn").removeClass("hidden");
    $(".picture-div").mouseleave(() => $(".upload-img-btn").addClass("hidden"));
  }

  updateImage(){

  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  openModal() {
    this.setState({ modalOpen: true });
  }

  upload(e){
    e.preventDefault();
    // const uploadButton = this;
    // cloudinary.openUploadWidget(CLOUDINARY_IMAGE_OPTIONS, (error, results) => {
    //   if(!error){
    //     uploadButton.props.uploadImage(results);
    //   }
    // });
  }

  render() {
    return(
      <div className="user-page">
        <div className="profile-div">
          <div className="picture-div">
            <img
              className="picture"
              onMouseOver={this.showUploadBtn}
              src={this.props.currentUser.user_image_url}/>
            <a className='upload-img-btn hidden' onClick={this.upload}>Change Image</a>
          </div>

          <div className="info">Welcome, {this.props.currentUser.username}</div>
        </div>

        <div className="playlist-div">
          <div className="playlist-header">
            <h2 className="header-text">YOUR  PLAYLISTS</h2>
            <button
              className="btn-add-playlist"
              onClick={this.openModal}>＋ CREATE PLAYLIST</button>
          </div>

          <Modal
            className="playlist-modal"
  					isOpen={this.state.modalOpen}
  					onRequestClose={this.closeModal}
            style={playlistModalStyle} >
            <PlaylistFormContainer
              closeModal={this.closeModal}/>
          </Modal>

          <PlaylistIndexContainer />
        </div>
      </div>
    );
  }
}

export default Profile;
