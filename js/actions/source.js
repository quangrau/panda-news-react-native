import type { Action } from './types';
import { fetchSources } from '../api';

export const SET_INDEX = 'SET_INDEX';
export const FETCH_SOURCES = 'FETCH_SOURCES';
export const FETCH_SOURCES_PENDING = 'FETCH_SOURCES_PENDING';
export const FETCH_SOURCES_FULFILLED = 'FETCH_SOURCES_FULFILLED';
export const FETCH_SOURCES_REJECTED = 'FETCH_SOURCES_REJECTED';

export function setIndex(index:number):Action {
  return {
    type: SET_INDEX,
    payload: index,
  };
}

export function getSources() {
  return {
    type: FETCH_SOURCES,
    payload: fetchSources(),
  };
}

