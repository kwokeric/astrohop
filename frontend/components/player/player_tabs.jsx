import React from 'react';
import ReactPlayer from 'react-player';

import Carousel from '../carousel/carousel_container';

class PlayerTabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {selectedTab: "related"};
    this.isActive = this.isActive.bind(this);
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

    if (this.state.selectedTab === "related") {
      let relatedVideos = this.props.currentMV.related_videos;

      tab = (
        <div className="related-tab">
          <Carousel videos={relatedVideos}/>
        </div>
      );
    } else if (this.state.selectedTab === "new") {
      let newVideos = [
        this.props.videos["ANS9sSJA9Yc"],
        this.props.videos["u1ZB_rGFyeU"],
        this.props.videos["B9BLMNn0PrQ"],
        this.props.videos["b4Bj7Zb-YD4"],
        this.props.videos["3dyojUNrPeg"],
        this.props.videos["-CmadmM5cOk"],
        this.props.videos["G5Mv2iV0wkU"],
        this.props.videos["ru0K8uYEZWw"],
        this.props.videos["zjVSewbKllk"]
      ];

      tab = (
        <div className="new-tab">
          <Carousel videos={newVideos}/>
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
      <section className="player-tabs-container">
        <ul className="tab-list">
          <li className={`related-tab ${this.isActive("related")}`} onClick={this.changeTab("related")}>RELATED VIDEOS</li>
          <li className={`new-tab ${this.isActive("new")}`} onClick={this.changeTab("new")}>NEW VIDEOS</li>
          <li className={`details-tab ${this.isActive("details")}`} onClick={this.changeTab("details")}>DETAILS</li>
        </ul>

        {tab}

      </section>
    );
  }
}

export default PlayerTabs;
