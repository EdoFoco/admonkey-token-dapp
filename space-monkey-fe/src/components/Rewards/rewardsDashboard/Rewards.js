import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Title from './Title';
import PropTypes from 'prop-types';
import { format } from 'date-fns'
import Button from '@material-ui/core/Button';
import Money from '../images/money/Money';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  centered:{
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default function Rewards(props) {
  const { reward, nextAvailableClaimDate, disabled, onClaimReward } = props;
  const classes = useStyles();
  return (
    <>
          <div className={classes.centered}>
            <Title>
              YOUR REWARDS
            </Title>
          </div>
          <Grid container spacing={3}>
            <Grid item xs={3} />
            <Grid item xs={6}>
              <Money />
            </Grid>
          <Grid item xs={3} />
    </Grid>
      <Typography component="p" variant="h4" className={classes.centered}>
        {`${reward} BNB`}
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
    </>
  );
}

Rewards.propTypes = {
  rewards: PropTypes.string,
  nextAvailableClaimDate: PropTypes.instanceOf(Date),
  balance: PropTypes.string,
  onClaimReward: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};
