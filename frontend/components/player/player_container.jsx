import { connect } from 'react-redux';

import Player from './player';
import { incrementViewCount } from '../../actions/player_actions';

const mapStateToProps = ({ videos }, ownProps) => {
  let mvUrl = ownProps.params.mvUrl;
  let currentMV;

  if (videos) {
    currentMV = videos[mvUrl];
  }

  return({
    currentMV,
    mvUrl,
    videos
  });
};

const mapDispatchToProps = (dispatch) => ({
  incrementViewCount: (mvUrl) => dispatch(incrementViewCount(mvUrl))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
