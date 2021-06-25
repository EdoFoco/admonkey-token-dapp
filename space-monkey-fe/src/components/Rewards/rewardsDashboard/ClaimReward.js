import React from 'react';
import Button from '@material-ui/core/Button';
import Title from './Title';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default function RewardsContainer({reward, onClaimReward, disabled}) {

  // if(this.drizzleState.accounts.length === 0){
  //     return(<div>We couldn't find a valid Wallet. Please create a wallet and come back.</div>)
  // }

  return (
  <>
    <Title>CLAIM YOUR REWARD</Title>
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

RewardsContainer.defaultProps = {
  disabled: true,
  reward: null,
};

RewardsContainer.propTypes = {
  reward: PropTypes.string,
  onClaimReward: PropTypes.func.isRequired,
};