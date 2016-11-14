import React from 'react';
import { hashHistory, Link } from 'react-router';

var Modal = require("react-modal");

import UserDisplay from './user_display';
import SessionFormContainer from '../session_form/session_form_container';
import SearchContainer from '../search/search_container';
import { authModalStyle } from '../../util/modal_styles.js';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginModalOpen: false,
      searchStr: ""
    };
	  this.openLoginModal = this.openLoginModal.bind(this);
	  this.closeLoginModal = this.closeLoginModal.bind(this);
    this.handleSearchQuery = this.handleSearchQuery.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.currentUser) {
      hashHistory.push("/");
    }
  }

  closeLoginModal() {
    this.setState({ loginModalOpen: false });
    this.props.clearErrors();
  }

  openLoginModal() {
    this.setState({ loginModalOpen: true });
  }

  handleSearch (e) {
    if (e.key === 'Enter') {
      hashHistory.push("search");
    }
  }

  handleSearchQuery(e){
    this.props.search(e.target.value);
    this.setState({searchStr: e.target.value});
  }

  search() {
    return(
      <div className="search">
        <input type="text"
               name="search-bar"
               onChange={this.handleSearchQuery}
               value={this.state.searchStr}
               onKeyPress={this.handleSearch} />
      </div>
    );
  }

  whichButton () {
    if (this.props.currentUser) {
      return <UserDisplay
        currentUser={this.props.currentUser}
        logout={this.props.logout} />;
    } else {
      return <button
        className="logInButton"
        onClick={this.openLoginModal}>LOG IN</button>;
    }
  }

  toIndex() {
    hashHistory.push("/");
  }

  render () {
    return(
      <nav className="header">
        <div className="left-div">
          <img
            className="logo-img"
            alt="Veevo Logo"
            onClick={this.toIndex}
            src="http://res.cloudinary.com/kwokeric/image/upload/c_scale,w_200/v1478596755/veevo_logo_w4ycla.png" />
        </div>

        {this.search()}

        <div className="right-div">
          {this.whichButton()}
        </div>

        <Modal
          className="login-modal"
					isOpen={this.state.loginModalOpen}
					onRequestClose={this.closeLoginModal}
          style={authModalStyle} >
          <SessionFormContainer
            closeModal={this.closeLoginModal}/>
        </Modal>
      </nav>
    );
  }
}

export default Header;
