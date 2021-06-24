import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import PropTypes from 'prop-types';
import { format } from 'date-fns'

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Rewards(props) {
  const { reward, nextAvailableClaimDate } = props;
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Your BNB Rewards</Title>
      <Typography component="p" variant="h4">
        {reward}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on {nextAvailableClaimDate ? format(nextAvailableClaimDate, 'do MMM yyyy') : ''}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}

Rewards.propTypes = {
  rewards: PropTypes.string,
  nextAvailableClaimDate: PropTypes.instanceOf(Date),
  balance: PropTypes.string,
};