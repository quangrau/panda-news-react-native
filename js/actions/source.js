import { fetchSources } from '../api';

export const SELECT_SOURCE = 'SELECT_SOURCE';
export const FETCH_SOURCES = 'FETCH_SOURCES';
export const FETCH_SOURCES_PENDING = 'FETCH_SOURCES_PENDING';
export const FETCH_SOURCES_FULFILLED = 'FETCH_SOURCES_FULFILLED';
export const FETCH_SOURCES_REJECTED = 'FETCH_SOURCES_REJECTED';

export function selectSource(key) {
  return {
    type: SELECT_SOURCE,
    payload: key,
  };
}

export function getSources() {
  return {
    type: FETCH_SOURCES,
    payload: fetchSources(),
  };
}

