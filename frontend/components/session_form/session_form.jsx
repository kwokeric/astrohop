import React from 'react';
import { Link, withRouter } from 'react-router';

var Modal = require("react-modal");

class SessionForm extends React.Component {
	constructor(props) {
	  super(props);

	  this.state = { username: "", password: "", selectedTab: "login" };
		this.handleSubmit = this.handleSubmit.bind(this);

	  this.disableButton = this.disableButton.bind(this);
	  this.updateForm = this.updateForm.bind(this);
	  this.renderErrors = this.renderErrors.bind(this);

	  this.changeTab = this.changeTab.bind(this);
	  this.handleDemo = this.handleDemo.bind(this);
	}

	updateForm(property){
	  return (e) => this.setState({[property]: e.target.value});
	}

	disableButton(){
	  if(this.state.password.length > 0
	      && this.state.username.length > 0) {
	    return false;
	  } else {
	    return true;
	  }
	}

	renderErrors() {
	  if(this.props.errors && this.props.errors.length > 0) {
	    return(
	      <ul className='errors'>
	        {this.props.errors.map((error, i) => (
	          <li key={`error-${i}`}>
	            {error}
	          </li>
	        ))}
	      </ul>
			);
	  }
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

	componentDidUpdate() {
		this.redirectIfLoggedIn();
	}

	componentWillReceiveProps(newProps) {
		if (!this.props.loggedIn && newProps.loggedIn) {
			this.props.closeModal();
		}
	}

	redirectIfLoggedIn() {
		if (this.props.loggedIn) {
			this.props.router.push("/");
		}
	}

	update(field) {
		return e => this.setState({
			[field]: e.currentTarget.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const user = {
			username: this.state.username,
			password: this.state.password};

		if (this.state.selectedTab === "login") {
			this.props.login(user);
		} else {
			this.props.signup(user);
		}
	}

	handleDemo(e) {
    e.preventDefault();
    const guest = {username: "guest", password: "password"};
    this.props.login(guest);
  }

	render() {
		let tabs;

		if (this.state.selectedTab === "login") {
			tabs = (
				<div className="buttons">
					<button className="login disabled">LOG IN</button>
					<button className="signup" onClick={this.changeTab("signup")}>SIGN UP</button>
				</div>
			);
		} else {
			tabs = (
				<div className="buttons">
					<button className="login" onClick={this.changeTab("login")}>LOG IN</button>
					<button className="signup disabled">SIGN UP</button>
				</div>
			);
		}
		return (
			<div className="login-modal-div">
				{tabs}

				<form onSubmit={this.handleSubmit} className="modal-form">
					<div className="input">
						<input type="text"
							className="username"
							placeholder="USERNAME"
							value={this.state.username}
							onChange={this.update("username")} />
						<input type="password"
							className="password"
							placeholder="PASSWORD"
							value={this.state.password}
							onChange={this.update("password")} />
						<input className="submit" type="submit" value="CONTINUE" />
					</div>

					<button className="guest-login" onClick={this.handleDemo}>GUEST LOGIN</button>

					{this.renderErrors()}
				</form>
			</div>
		);
	}
}

export default withRouter(SessionForm);
