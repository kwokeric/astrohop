import React from 'react';
import {withRouter} from 'react-router';
import $ from 'jquery';

class UserDisplay extends React.Component {
  constructor (props) {
    super(props);

    this.profileButton = this.profileButton.bind(this);
    this.usernameDropdown = this.usernameDropdown.bind(this);
    this.userHover = this.userHover.bind(this);
  }

  profileButton () {
    this.props.router.push(`/users/${this.props.currentUser.id}`);
  }

  usernameDropdown () {
    $(".dropdown").removeClass("hidden");
    $(".dropdown").mouseleave(() => $(".dropdown").addClass("hidden"));
  }

  userHover () {
    $(".icon").addClass("hidden");
    $(".username").addClass("username-hover");
  }

  userLeave () {
    $(".icon").removeClass("hidden");
    $(".username").removeClass("username-hover");
  }

  render () {
    return(
      <div
        className="user-display"
        onMouseEnter={this.userHover}
        onMouseLeave={this.userLeave}>
        <img
          className="thumbnail"
          onClick={this.usernameDropdown}
          src={this.props.currentUser.user_image_url} />

        <span className="username group" onClick={this.usernameDropdown}>
          {this.props.currentUser.username}

          <ul className="dropdown hidden">
            <li className="headerList">
              <button className="userProfile" onClick={this.profileButton}>PROFILE</button>
            </li>
            <li className="headerList">
              <button className="headerLogout" onClick={this.props.logout}>LOG OUT</button>
            </li>
          </ul>
        </span>

        <div className="icon-div" onClick={this.usernameDropdown}>
          <img
            className="icon"
            src="http://res.cloudinary.com/kwokeric/image/upload/v1478277518/drop_down_icon_zj3min.png" />
        </div>

      </div>
    );
  }
}

export default withRouter(UserDisplay);
