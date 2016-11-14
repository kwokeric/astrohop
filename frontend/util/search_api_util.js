export const fetchSearchResults = (query, success, error) => {
  $.ajax({
    method: "GET",
    url: `/api/search?q=${query}`,
    success,
    error
  });
};
