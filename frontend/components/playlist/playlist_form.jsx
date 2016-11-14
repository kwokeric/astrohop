import React from 'react';

import PlaylistFormContainer from '../playlist/playlist_form_container';

class PlaylistForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { playlist_title: "", description: "", playlist_image_url: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
		return e => this.setState({
			[field]: e.currentTarget.value
		});
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

  handleSubmit(e) {
    e.preventDefault();
    const playlist = {
      playlist_title: this.state.playlist_title,
      description: this.state.description,
      playlist_image_url: this.state.playlist_image_url};

    this.props.createPlaylist(playlist);
  }

  render () {
    return(
      <div className="playlist-modal-div">
        <div className="title-div">CREATE PLAYLIST</div>

        <form onSubmit={this.handleSubmit} className="playlist-modal-form">
					<div className="input">
            <h1 className="label">TITLE</h1>
						<input type="text"
							className="title"
							placeholder="Title"
							value={this.state.playlist_title}
							onChange={this.update("playlist_title")} />
            <h1 className="label">DESCRIPTION</h1>
            <textarea
							className="description"
							placeholder="Description"
							value={this.state.description}
							onChange={this.update("description")} />
            <h1 className="label">IMAGE URL</h1>
            <input type="text"
							className="img-url"
							placeholder="http://..."
							value={this.state.playlist_image_url}
							onChange={this.update("playlist_image_url")} />
            <input className="submit" type="submit" value="SUBMIT" />
					</div>

					{this.renderErrors()}
				</form>
      </div>
    );
  }
}

export default PlaylistForm;
