/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import {API_KEY, BASE_URL} from '../constants/config';
import {cardTrackTileStyles} from '../styles/styles';

/**
 * @description Top Artist component
 */
class TopTrack extends Component {
  /**
   * Method to fetch top song data
   * @param {string} artist
   */
  componentDidMount() {
    window.scrollTo(0, 0);
    const topTracksURL = `${BASE_URL}?method=chart.gettoptracks&api_key=${API_KEY}&format=json`;
    this.props.fetchData(topTracksURL, 'topTrack');
  }

  /**
   * Method to render artist tile
   * @param {number} i
   * @return {JSX}
   */
  renderTrackTile = (i) => {
    const {classes, topTrack} = this.props;
    const tracks = topTrack.tracks;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography gutterBottom component="h2" className={classes.title}>
            <strong>{tracks[i].name}</strong>
          </Typography>
          <Typography component="p" className={classes.overview}>
            <strong>PLAYCOUNT</strong> - {tracks[i].playcount}
            <br />
            <strong>LISTENERS</strong> - {tracks[i].listeners}
          </Typography>
          <Typography component="p" className={classes.overview}>
            <strong>URL</strong> -{' '}
            <a href={tracks[i].url}>Click here for more info</a>
          </Typography>
        </CardContent>
      </Card>
    );
  };

  /**
   * Method to render the component
   * @return {JSX}
   */
  render() {
    if (this.props.hasErrored) {
      return (
        <div className="center">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <h1> Oops! Couldn't fetch data. </h1>
        </div>
      );
    }

    if (this.props.isLoading) {
      return (
        <div className="center">
          <CircularProgress color="secondary" size={150} disableShrink />
        </div>
      );
    }

    return (
      <div className="artist">
        <h1 className="title">TOP TRACKS</h1>
        <div className='container_track'>
          <div className="track-listing__blocks">
            {this.props.topTrack.tracks !== undefined ?
            this.props.topTrack.tracks.map((item, index) => {
              return <div key={index}>{this.renderTrackTile(index)}</div>;
            }) :
            []}
          </div>
        </div>
      </div>
    );
  }
}

TopTrack.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(cardTrackTileStyles)(TopTrack);
