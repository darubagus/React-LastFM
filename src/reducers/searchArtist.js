import {FETCH_DATA_SUCCESS_SEARCH_ARTIST} from '../constants/ActionTypes';

/**
 *
 * @param {array} state
 * @param {action} action
 * @return {object}
 */
export function searchArtist(state = [], action) {
  switch (action.type) {
    case FETCH_DATA_SUCCESS_SEARCH_ARTIST:
      return {
        ...action.searchArtist,
        artists: action.searchArtist.results.artistmatches.artist,
      };

    default:
      return state;
  }
}
