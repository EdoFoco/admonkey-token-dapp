import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import PropTypes from 'prop-types';
import { format } from 'date-fns'
import Button from '@material-ui/core/Button';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Rewards(props) {
  const { reward, nextAvailableClaimDate, disabled, onClaimReward } = props;
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
      <Button
        variant="contained"
        color="primary"
        size="large"
        disabled={disabled}
        onClick={() => { onClaimReward() }}
      >
        {reward}
        {/* {this.state.reward} */}
      </Button>
    </React.Fragment>
  );
}

Rewards.propTypes = {
  rewards: PropTypes.string,
  nextAvailableClaimDate: PropTypes.instanceOf(Date),
  balance: PropTypes.string,
  onClaimReward: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};
