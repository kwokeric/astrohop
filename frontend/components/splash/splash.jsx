import React from 'react';

import IndexCarousels from './index_carousels';

class Splash extends React.Component {
  constructor (props) {
    super(props);

    this.handleDemo = this.handleDemo.bind(this);
    this.demo = this.demo.bind(this);
  }

  handleDemo(e) {
    e.preventDefault();
    const guest = {username: "guest", password: "password"};
    this.props.login(guest);
  }

  headline () {
    return(
      <div className="headline">
        <div id="sentence-wrapper">
          <h2 className="sentence">
            <span>A music video experience that is</span>
            <div className="words words-1">
              <span>inspiring</span>
              <span>customized</span>
              <span>captivating</span>
              <span>uncomplicated</span>
              <span>engaging</span>
              <span>optimized</span>
            </div>
          </h2>
        </div>
      </div>
    );
  }

  demo () {
    if (!this.props.currentUser) {
      return(
        <button className="demo-button" onClick={this.handleDemo}>DEMO</button>
      );
    }
  }

  render () {
    return(
      <div className="index">
        <div className="splash">
          {this.headline()}
          {this.demo()}
        </div>

        <IndexCarousels videos={this.props.videos}/>
      </div>
    );
  }
}

export default Splash;
