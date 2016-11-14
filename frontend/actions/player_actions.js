export const FETCH_VIDEOS = "FETCH_VIDEOS";
export const FETCH_RELATED_VIDEOS = "FETCH_RELATED_VIDEOS";
export const RECEIVE_VIDEOS = "RECEIVE_VIDEOS";
export const RECEIVE_RELATED_VIDEOS = "RECEIVE_RELATED_VIDEOS";
export const INCREMENT_VIEW_COUNT = "INCREMENT_VIEW_COUNT";

export const fetchVideos = () => ({
  type: FETCH_VIDEOS
});

export const fetchRelatedVideos = mvUrl => ({
  type: FETCH_RELATED_VIDEOS,
  mvUrl
});

export const receiveVideos = videos => ({
  type: RECEIVE_VIDEOS,
  videos
});

export const receiveRelatedVideos = videos => ({
  type: RECEIVE_RELATED_VIDEOS,
  videos
});

export const incrementViewCount = mvUrl => ({
  type: INCREMENT_VIEW_COUNT,
  mvUrl
});
