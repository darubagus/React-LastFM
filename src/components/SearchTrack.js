/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {cardTileStyles} from '../styles/styles';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {API_KEY, BASE_URL} from '../constants/config';

// eslint-disable-next-line valid-jsdoc
/**
 * @description Top Artist component
 */
class SearchTrack extends Component {
  /**
   * Method to fetch track search result
   * @param {string} trackName
   */
  fetchTrackData(trackName) {
    const searchTrackURL = `${BASE_URL}?method=track.search&track=${trackName}&api_key=${API_KEY}&format=json`;
    this.props.fetchData(searchTrackURL, 'searchTrack');
  }

  /**
   * Method to mount the component
   */
  componentDidMount() {
    console.log('search track');
    console.log(this.props);
    window.scrollTo(0, 0);
    const trackName = this.props.match.params.trackName;
    this.fetchTrackData(trackName);
  }

  /**
   * Method to update the component
   * @param {props} prevProps
   */
  componentDidUpdate(prevProps) {
    window.scrollTo(0, 0);
    const trackName = this.props.match.params.trackName;
    if (trackName !== prevProps.match.params.trackName) {
      this.fetchTrackData(trackName);
    }
  }

  /**
   * Method to render artist tile
   * @param {number} i
   * @return {JSX}
   */
  renderArtistTile = (i) => {
    const {classes, searchTrack} = this.props;
    console.log(searchTrack);
    const track = searchTrack.artists;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography gutterBottom component="h2" className={classes.title}>
            <strong>{track[i].name}</strong>
          </Typography>
          <Typography component="p" className={classes.overview}>
            <strong>LISTENERS</strong> - {track[i].listeners}
          </Typography>
          <Typography component="p" className={classes.overview}>
            <strong>URL</strong> -{' '}
            <a href={track[i].url}>Click here for more info</a>
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
    console.log(this.props);
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
        <h1 className="title">SEARCH RESULT</h1>
        <div className='container_track'>
          <div className="track-listing__blocks">
            {this.props.searchTrack.artists !== undefined ?
              this.props.searchTrack.artists.map((item, index) => {
                return <div key={index}>{this.renderArtistTile(index)}</div>;
              }) :
              []}
          </div>
        </div>
      </div>
    );
  }
}

SearchTrack.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(cardTileStyles)(SearchTrack);
