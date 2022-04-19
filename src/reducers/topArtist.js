import {FETCH_DATA_SUCCESS_ARTIST} from '../constants/ActionTypes';

/**
 *
 * @param {array} state
 * @param {action} action
 * @return {object}
 */
export function topArtist(state = [], action) {
  switch (action.type) {
    case FETCH_DATA_SUCCESS_ARTIST:
      return {
        ...action.topArtist,
        artists: action.topArtist.artists.artist,
      };

    default:
      return state;
  }
}
