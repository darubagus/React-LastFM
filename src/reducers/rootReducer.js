import {combineReducers} from 'redux';

import {searchTrack} from './searchTrack';
import {searchArtist} from './searchArtist';
import {topArtist} from './topArtist';
import {topTrack} from './topTrack';
import {artistDetails} from './artistDetails';
import {inputValue} from './input';
import {isLoading} from './isLoading';
import {hasErrored} from './hasErrored';

const rootReducer = combineReducers({
  topArtist,
  topTrack,
  searchArtist,
  searchTrack,
  artistDetails,
  inputValue,
  isLoading,
  hasErrored,
});

export default rootReducer;
