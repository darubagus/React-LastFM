import {FETCH_DATA_SUCCESS_SEARCH_TRACK} from '../constants/ActionTypes';

/**
 *
 * @param {array} state
 * @param {action} action
 * @return {object}
 */
export function searchTrack(state = [], action) {
  switch (action.type) {
    case FETCH_DATA_SUCCESS_SEARCH_TRACK:
      return {
        ...action.searchTrack,
        artists: action.searchTrack.results.trackmatches.track,
      };

    default:
      return state;
  }
}
