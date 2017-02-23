export const fetchFeeds = (source, page = 1, filter = 'popular', limit = 30) => {
  const endpoint = `https://cdnapi.pnd.gs/v2/feeds`;
  return fetch(`${endpoint}?limit=${limit}&page=${page}&sort=${filter}&sources=${source}`)
    .then((response) => response.json());
}

export const fetchSources = () => {
  const endpoint = 'https://cdnapi.pnd.gs/v1.1/sources?integrations=true&languages=*';
  return fetch(endpoint).then((response) => response.json());
}
