export const fetchFeeds = (source, page = 1, sort = 'latest') => {
  console.log(sort);
  const endpoint = `https://cdnapi.pnd.gs/v2/feeds`;

  return fetch(`${endpoint}?limit=30&page=${page}&sort=${sort}&sources=${source}`)
    .then((response) => response.json());
}

export const fetchSources = () => {
  const endpoint = 'https://cdnapi.pnd.gs/v1.1/sources?integrations=true&languages=*';
  return fetch(endpoint).then((response) => response.json());
}
