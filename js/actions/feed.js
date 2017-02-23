import { fetchFeeds } from '../api';

export const FETCH_FEEDS = 'FETCH_FEEDS';
export const FETCH_FEEDS_PENDING = 'FETCH_FEEDS_PENDING';
export const FETCH_FEEDS_FULFILLED = 'FETCH_FEEDS_FULFILLED';
export const FETCH_FEEDS_REJECTED = 'FETCH_FEEDS_REJECTED';

export function getFeeds(source:string, page:number, sort:string) {
  return {
    type: FETCH_FEEDS,
    payload: fetchFeeds(source, page, sort),
  };
}
