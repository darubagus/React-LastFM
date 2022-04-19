import * as actionTypes from '../constants/ActionTypes';

/**
 * @description - loading state
 * @param {boolean} bool
 * @return {object} - action
 */
export function fetchIsLoading(bool) {
  return {
    type: actionTypes.IS_LOADING,
    isLoading: bool,
  };
}

/**
 * Method to fetch data from API
 * @param {string} url
 * @param {string} type
 * @return {object} response
 */
export function fetchData(url, type) {
  return (dispatch) => {
    dispatch(fetchIsLoading(true));
    fetch(url)
        .then((response) => {
          console.log(response);
          if (!response.ok) {
            throw Error(response.statusText);
          }
          dispatch(fetchIsLoading(false));
          return response;
        })
        .then((response) => response.json())
        .then((item) => {
          return dispatch(fetchDataSuccess(item, type));
        })
        .catch((err) => {
          console.log('err', err);
          return dispatch(fetchDataErrored(true));
        });
  };
}

/**
 * Method to update state if data is fetched successfully
 * @param {object} item
 * @param {string} type
 * @return {object} action
 */
export function fetchDataSuccess(item, type) {
  if (type === 'topTrack') {
    return {
      type: actionTypes.FETCH_DATA_SUCCESS_TRACK,
      topTrack: item,
    };
  } else if (type === 'trackDetails') {
    return {
      type: actionTypes.FETCH_DATA_SUCCESS,
      trackDetails: item,
    };
  };

  if (type === 'topArtist') {
    return {
      type: actionTypes.FETCH_DATA_SUCCESS_ARTIST,
      topArtist: item,
    };
  } else if (type === 'artistDetails') {
    return {
      type: actionTypes.FETCH_ARTIST_DETAIL,
      artistDetails: item,
    };
  }

  if (type === 'searchArtist') {
    return {
      type: actionTypes.FETCH_DATA_SUCCESS_SEARCH_ARTIST,
      searchArtist: item,
    };
  } else if (type === 'searchTrack') {
    return {
      type: actionTypes.FETCH_DATA_SUCCESS_SEARCH_TRACK,
      searchTrack: item,
    };
  }
}

/**
 * Method to update state if data is fetched unsuccessfully
 * @param {boolean} bool
 * @return {object} action
 */
export function fetchDataErrored(bool) {
  return {
    type: actionTypes.FETCH_HAS_ERRORED,
    hasErrored: bool,
  };
}

/**
 * Input change action
 * @param {event} e
 * @return {object} action
 */
export function handleInput(e) {
  return {
    type: actionTypes.INPUT_CHANGE,
    text: e.target.value,
  };
}
