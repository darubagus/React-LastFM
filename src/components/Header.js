/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import {headerStyles} from '../styles/styles';
import {Link} from 'react-router-dom';

const Header = (props) => {
  const {classes} = props;

  const topArtist = (
    <Link className={classes.topArtist} to="/">
        Top Artist
    </Link>
  );

  const topTrack = (
    <Link className={classes.topTrack} to="/topTrack">
        Top Track
    </Link>
  );

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.t}>
          <div className='copyright-container'>
            <h4 className='copyright'>Copyright Daru Bagus Dananjaya 2022</h4>
          </div>
          <div className='button-header'>
            {topArtist}
          </div>
          <div className='button-header'>
            {topTrack}
          </div>
          <TextField
            className={classes.textField}
            id="artist"
            placeholder="Looking for something?"
            variant="outlined"
            value={props.inputValue}
            onChange={props.handleInput}
            margin="dense"
          />
          <div className='button-header'>
            <Link
              to={{
                pathname: `/searchTrack/${props.input.inputValue}`,
              }}
            >
              <Button variant="contained" color="secondary" type="submit">
              Search Track
              </Button>
            </Link>
          </div>
          <Link
            to={{
              pathname: `/searchArtist/${props.input.inputValue}`,
            }}
          >
            <Button variant="contained" color="secondary" type="submit">
              Search Artist
            </Button>
          </Link>

        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(headerStyles)(Header);
