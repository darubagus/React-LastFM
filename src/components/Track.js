import React from 'react';
import {Switch, Route} from 'react-router-dom';
import TopTrack from './TopTrack';
import SearchArtist from './SearchArtist';
import SearchTrack from './SearchTrack';

const Track = (props) => (
  <main>
    <Switch>
      <Route exact path="/topTrack" render={() => <TopTrack {...props} />} />
      <Route
        exact
        path="/searchArtist/:artistName"
        render={(routeProps) => (
          <SearchArtist {...{...props, ...routeProps}} />
        )}
      />
      <Route
        exact
        path="/searchTrack/:trackName"
        render={(routeProps) => (
          <SearchTrack {...{...props, ...routeProps}} />
        )}
      />
    </Switch>
  </main>
);

export default Track;
