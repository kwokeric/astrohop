import React from 'react';

import Carousel from '../carousel/carousel.jsx';

class IndexCarousels extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    let newVideos = [
      this.props.videos["ANS9sSJA9Yc"],
      this.props.videos["u1ZB_rGFyeU"],
      this.props.videos["htNmT31AW9U"],
      this.props.videos["b4Bj7Zb-YD4"],
      this.props.videos["-CmadmM5cOk"],
      this.props.videos["B9BLMNn0PrQ"],
      this.props.videos["G5Mv2iV0wkU"],
      this.props.videos["nntGTK2Fhb0"],
      this.props.videos["KFWFJGfEaNo"],
      this.props.videos["eRaFMlZ1YHA"],
      this.props.videos["kV6UoK8jXSM"],
      this.props.videos["ru0K8uYEZWw"],
      this.props.videos["YykjpeuMNEk"],
      this.props.videos["zr9Q4QL7w9A"],
      this.props.videos["v9rdDwH1JAo"],
      this.props.videos["zjVSewbKllk"]
    ];

    let popularVideos = [
      this.props.videos["EgqUJOudrcM"],
      this.props.videos["egZrQwtFtik"],
      this.props.videos["-zzP29emgpg"],
      this.props.videos["93ASUImTedo"],
      this.props.videos["_mTRvJ9fugM"],
      this.props.videos["fDrTbLXHKu8"],
      this.props.videos["8ELh8eOzq_0"],
      this.props.videos["5AOtEnH87Mg"],
      this.props.videos["llDikI2hTtk"],
      this.props.videos["aKb9VQpoe_U"],
      this.props.videos["la0-5QFLr14"],
      this.props.videos["ugrFTySNeQk"],
      this.props.videos["eCGV26aj-mM"],
      this.props.videos["VPRjCeoBqrI"],
      this.props.videos["6vopR3ys8Kw"],
      this.props.videos["09R8_2nJtjg"]
    ];

    let staffVideos = [
      this.props.videos["3ArOBAt5Ml0"],
      this.props.videos["4nsKDJlpUbA"],
      this.props.videos["kOkQ4T5WO9E"],
      this.props.videos["aAEQt7wq44w"],
      this.props.videos["koeW4g8Y-lg"],
      this.props.videos["uxpDa-c-4Mc"],
      this.props.videos["66vdaLrxN8s"],
      this.props.videos["qybUFnY7Y8w"],
      this.props.videos["iiNXf0n_hrA"],
      this.props.videos["2qPl5P0yBiY"],
      this.props.videos["DzyKSyLavUY"],
      this.props.videos["FyXtoTLLcDk"],
      this.props.videos["B0bXdMQlrEY"],
      this.props.videos["JyqemIbjcfg"],
      this.props.videos["UCJHMT0JFnQ"],
      this.props.videos["6byaTlhGJXM"]
    ];

    return (
      <div className="carousel-container">
        <h1 className="carousel-title">NEW RELEASES</h1>
        <Carousel videos={newVideos}/>
        <h1 className="carousel-title">POPULAR VIDEOS</h1>
        <Carousel videos={popularVideos}/>
        <h1 className="carousel-title">STAFF PICKS</h1>
        <Carousel videos={staffVideos}/>
      </div>
    );
  }
}

export default IndexCarousels;
