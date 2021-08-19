import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import balance from './balance.png'

const useStyles = makeStyles({
  root: {
    height: '100%',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: '50%',
    padding: '1 rem',
  },
});

export default function Balance({}) {
  const classes = useStyles();
  return (
  <div className="image-wrapper">
    <img
      className={classes.root}
      alt=""
      src={balance}
    />
  </div>
  );
}

Balance.defaultProps = {

};

Balance.propTypes = {
};