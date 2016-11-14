export const fetchVideos = (success) => {
  $.ajax({
    type: 'GET',
    url: "api/music_videos",
    success
  });
};

export const fetchRelatedVideos = (mvUrl, success) => {
  $.ajax({
    type: 'GET',
    url: `api/music_videos/related_videos`,
    data: {mv_url: mvUrl},
    success
  });
};

export const incrementViewCount = ( mvUrl ) => {
  $.ajax({
    type: 'PATCH',
    url: "api/music_videos/increment_view_count",
    data: {mv_url: mvUrl}
  });
};
