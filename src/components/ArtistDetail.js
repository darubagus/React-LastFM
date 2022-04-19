/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {cardStyles} from '../styles/styles';
import {withStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import {API_KEY, BASE_URL} from '../constants/config';


/**
 * @description ArtistDetail component
 */
class ArtistDetail extends React.Component {
  /**
   * METHOD to fetch artist data
   * @param {string} artistName
   */
  fetchArtistData(artistName) {
    const artistURL = `${BASE_URL}?method=artist.getinfo&artist=${artistName}&api_key=${API_KEY}&format=json`;
    this.props.fetchData(artistURL, 'artistDetails');
  }

  /**
   * METHOD to check if component is update, if yes then fetch data
   * @param {props} prevProps
   */
  componentDidUpdate(prevProps) {
    window.scrollTo(0, 0);
    const artistName = this.props.match.params.artistName;
    if (artistName !== prevProps.match.params.artistName) {
      this.fetchArtistData(artistName);
    }
  }

  /**
   * Method to mount the component with artist
   */
  componentDidMount() {
    window.scrollTo(0, 0);
    const artistName = this.props.match.params.artistName;
    this.fetchArtistData(artistName);
  }

  /**
   * Method to check if object is empty
   * @param {object} obj
   * @return {boolean}
   */
  isEmpty(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  /**
   * Method to render the component
   * @return {jsx}
   */
  render() {
    const {classes} = this.props;

    const backToHome = (
      <Link className={classes.backToHome} to="/topArtist">
        BackToHome
      </Link>
    );

    if (this.props.isLoading) {
      return (
        <div className="center">
          <CircularProgress color="secondary" size={150} disableShrink />
        </div>
      );
    }

    if (this.props.match.params.artistName === 'undefined') {
      return (
        <div>
          {' '}
          {backToHome}
          <h1>Enter Valid Name</h1>
        </div>
      );
    }

    if (this.isEmpty(this.props.artistDetails)) {
      return (
        <div>
          {' '}
          {backToHome}
          <h1>Artist not found</h1>
        </div>
      );
    }

    const playCount = this.props.artistDetails.stats ?
      this.props.artistDetails.stats.playcount :
      null;

    const listeners = this.props.artistDetails.stats ?
      this.props.artistDetails.stats.listeners :
      null;

    let para = this.props.artistDetails.bio ?
      this.props.artistDetails.bio.content :
      null;

    if (para !== null) {
      const text = para.split('<');
      para = text[0];
    }

    const tags = this.props.artistDetails.tags ?
      this.props.artistDetails.tags.tag.map((item, index) => (
        <div key={index}>
          <li>{item.name}</li>
        </div>
      )) :
      null;

    const similarTag = this.props.artistDetails.similar ?
      this.props.artistDetails.similar.artist.map((item, index) => (
        <div key={index}>
          <li>{item.name}</li>
        </div>
      )) :
      null;

    return (
      <div>
        {backToHome}
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <Typography gutterBottom component="h2" className={classes.title}>
              <strong>{this.props.artistDetails.name}</strong>
            </Typography>
            <Typography>
              <strong>Playcount: </strong>
              {playCount}
            </Typography>
            <br />
            <Typography>
              <strong>Listeners:</strong> {listeners}
            </Typography>
            <br />
            <Typography>
              {tags.length !== 0 ? <strong>Tags:</strong> : null}
            </Typography>
            <br />
            {tags}
            <br />
            {para.length !== 0 ? <strong>Overview :</strong> : null}
            <p className={classes.overview}>{para}</p>
            <Typography>
              <a href={this.props.artistDetails.url}>
                Click here to view profile of {this.props.artistDetails.name}
              </a>
            </Typography>
            <br />
            {similarTag.length !== 0 ? (
              <h2>
                <strong>Similar artists: </strong>
              </h2>
            ) : null}
            {similarTag}
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(cardStyles)(ArtistDetail);
