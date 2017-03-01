import { fetchFeeds } from '../api';

export const FETCH_FEEDS = 'FETCH_FEEDS';
export const FETCH_FEEDS_PENDING = 'FETCH_FEEDS_PENDING';
export const FETCH_FEEDS_FULFILLED = 'FETCH_FEEDS_FULFILLED';
export const FETCH_FEEDS_REJECTED = 'FETCH_FEEDS_REJECTED';
export const NEXT_PAGE = 'NEXT_PAGE';

export function getFeeds(source, page, filter, limit) {
  return (dispatch, getState) => {
    const state = getState();

    // Skip when data is fetching
    if (state.feeds.loading) return false;

    // Increase current page
    dispatch(nextPage(page));

    // call API
    return dispatch({
      type: FETCH_FEEDS,
      payload: fetchFeeds(source, page, filter, limit),
    });
  };
}

export function nextPage(page) {
  return {
    type: NEXT_PAGE,
    payload: page,
  };
}

