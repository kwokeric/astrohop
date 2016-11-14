import React from 'react';
import Slider from 'react-slick';
import { hashHistory } from 'react-router';

class PlaylistCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler (mvUrl) {
    return (e) => {
      e.preventDefault();
      $(document).scrollTop(0);
      hashHistory.push(`/pl/${this.props.playlistId}/mv/${mvUrl}`);
    };
  }

  renderItems () {
    return(
      this.props.videos.map((video, i) => (
        <div
          key={`item-${i}`}
          className={"carousel-item"}
          onClick={this.clickHandler(video.mv_url)}>
          <img
            className="thumbnail"
            src={`https://img.youtube.com/vi/${video.mv_url}/hqdefault.jpg`} />
          <div className="item-info">
            <p className="artist">{video.artist_name}</p>
            <p className="song-title">{video.song_title}</p>
          </div>
        </div>
      ))
    );
  }

  render () {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 2,
      responsive: [
        {
        breakpoint: 1200,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 2
          }
        },
        {
        breakpoint: 1000,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
        breakpoint: 750,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
        breakpoint: 450,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    if (!this.props.videos || !this.props.videos[0]) {
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
      return (
        <Slider {...settings} className="carousel-slider">
          {this.renderItems()}
        </Slider>
      );
    }
  }
}

export default PlaylistCarousel;
