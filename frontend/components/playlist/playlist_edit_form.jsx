import React from 'react';

class PlaylistEditForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { playlist_title: "", description: "", playlist_image_url: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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
      id: this.props.playlist.id,
      playlist_title: this.state.playlist_title,
      description: this.state.description,
      playlist_image_url: this.state.playlist_image_url};

    this.props.updatePlaylist(playlist);
  }

  handleDelete(e) {
    e.preventDefault();

    this.props.deletePlaylist(this.props.playlist.id);
  }

  render () {
    return(
      <div className="playlist-modal-div">
        <div className="title-div">EDIT PLAYLIST</div>

        <form onSubmit={this.handleSubmit} className="playlist-modal-form">
					<div className="input">
            <h1 className="label">TITLE</h1>
						<input type="text"
							className="title"
							value={this.props.playlist.title}
							onChange={this.update("playlist_title")} />
            <h1 className="label">DESCRIPTION</h1>
            <textarea
							className="description"
							onChange={this.update("description")}>{this.props.description}</textarea>
            <h1 className="label">IMAGE URL</h1>
            <input type="text"
							className="img-url"
							value={this.props.playlist.image_url || ""}
							onChange={this.update("playlist_image_url")} />
            <input className="submit" type="submit" value="SUBMIT" />
					</div>

          <button
            className="btn-delete-playlist"
            onClick={this.handleDelete}>DELETE</button>

					{this.renderErrors()}
				</form>
      </div>
    );
  }
}

export default PlaylistEditForm;
