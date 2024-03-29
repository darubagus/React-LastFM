import {FETCH_ARTIST_DETAIL} from '../constants/ActionTypes';

/**
 *
 * @param {array} state
 * @param {action} action
 * @return {object}
 */
export function artistDetails(state = [], action) {
  switch (action.type) {
    case FETCH_ARTIST_DETAIL:
      return {
        ...action.artistDetails.artist,
      };

    default:
      return state;
  }
}
