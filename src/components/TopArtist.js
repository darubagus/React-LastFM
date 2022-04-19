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
import {Link} from 'react-router-dom';
import {API_KEY, BASE_URL} from '../constants/config';

// eslint-disable-next-line valid-jsdoc
/**
 * @description Top Artist component
 */
class TopArtist extends Component {
  /**
   * Method to fetch top artist data
   */
  componentDidMount() {
    window.scrollTo(0, 0);
    const topArtistURL = `${BASE_URL}?method=chart.gettopartists&api_key=${API_KEY}&format=json`;
    this.props.fetchData(topArtistURL, 'topArtist');
  }

  /**
   * Method to render artist tile
   * @param {number} i
   * @return {JSX}
   */
  renderArtistTile = (i) => {
    const {classes, topArtist} = this.props;
    const artist = topArtist.artists;
    return (
      <Link to={`/artistinfo/${artist[i].name}`}>
        <Card className={classes.card}>
          <CardContent>
            <Typography gutterBottom component="h2" className={classes.title}>
              <strong>{artist[i].name}</strong>
            </Typography>
            <Typography component="p" className={classes.overview}>
              <strong>PLAYCOUNT</strong> - {artist[i].playcount}
              <br />
              <strong>LISTENERS</strong> - {artist[i].listeners}
            </Typography>
            <Typography component="p" className={classes.overview}>
              <strong>URL</strong> -{' '}
              <a href={artist[i].url}>Click here for more info</a>
            </Typography>
          </CardContent>
        </Card>
      </Link>
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
        <h1 className="title">TOP ARTISTS</h1>
        <div className='container_track'>
          <div className="track-listing__blocks">
            {this.props.topArtist.artists !== undefined ?
            this.props.topArtist.artists.map((item, index) => {
              return <div key={index}>{this.renderArtistTile(index)}</div>;
            }) :
            []}
          </div>
        </div>

      </div>
    );
  }
}

TopArtist.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(cardTileStyles)(TopArtist);
