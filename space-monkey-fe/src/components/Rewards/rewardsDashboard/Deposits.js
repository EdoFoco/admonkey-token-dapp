import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import PropTypes from 'prop-types';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits(props) {
  const classes = useStyles();
  console.log(`Deposit`, props);

  return (
    <React.Fragment>
      <Title>Your Rewards</Title>
      <Typography component="p" variant="h4">
        {props.reward}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on {props.nextAvailableClaimDate}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}

Deposits.propTypes = {
  rewards: PropTypes.string,
  nextAvailableClaimDate: PropTypes.string,
  balance: PropTypes.string,
};