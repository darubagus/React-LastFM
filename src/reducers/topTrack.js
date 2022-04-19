import {FETCH_DATA_SUCCESS_TRACK} from '../constants/ActionTypes';

/**
 *
 * @param {array} state
 * @param {action} action
 * @return {object}
 */
export function topTrack(state = [], action) {
  switch (action.type) {
    case FETCH_DATA_SUCCESS_TRACK:
      return {
        ...action.topTrack,
        tracks: action.topTrack.tracks.track,
      };

    default:
      return state;
  }
}
