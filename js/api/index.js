export const fetchFeeds = (source, page = 1, sort = 'latest') => {
  const endpoint = `https://cdnapi.pnd.gs/v2/feeds`;

  return fetch(`${endpoint}?limit=30&page=${page}&sort=${sort}&sources=${source}`)
    .then((response) => response.json());
}
