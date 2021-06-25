import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Title from './Title';
import PropTypes from 'prop-types';
import { withAppContextConsumer } from '../../../services/app-context';
import { withDrizzleContextConsumer } from '../../../services/drizzle';
import SpaceMonkeyContract from '../../../contracts/SpaceMonkey';
import { getTokenTransactionsForWallet } from '../../../services/bsscan';
import _ from 'lodash';

class RewardsContainer extends React.Component {

  constructor(props) {
    super(props);

    const { drizzle, drizzleState, initialized } = props.drizzleContext;
    this.web3 = drizzle.web3;
    this.contracts = drizzle.contracts;
    this.drizzleState = drizzleState;

    this.state = {
      initialized: false,
      reward: null,
      balance: null,
      nextAvailableClaimDate: null,
      transactions: []
    };
  }

  componentDidMount() {
    const { drizzle } = this.props.drizzleContext;

    this.unsubscribe = drizzle.store.subscribe(() => {
      const drizzleState = drizzle.store.getState();

      if (drizzleState.drizzleStatus.initialized && !this.state.initialized) {
        this.setState({ initialized: true });

        SpaceMonkeyContract.drizzle = drizzle;
        SpaceMonkeyContract.calculateBNBReward()
          .then(reward => {
            // Todo: Handle BigInts
            this.setState({ "reward": Math.round(reward / (10 ** 18) * 100000, 6) / 100000 });
          });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  // replace true === true with date calc
  isButtonDisabled() {
    if (null != this.state.reward
      && parseFloat(this.state.reward, 10) === 0
      && true === true) {
      return false;
    }
    return true;
  }

  render() {
    if (this.drizzleState.accounts.length === 0) {
      return (<div>We couldn't find a valid Wallet. Please create a wallet and come back.</div>)
    }

    return (
      <>
        <Title>CLAIM YOUR REWARD</Title>
        <Button
          disabled={this.isButtonDisabled()}
          onClick={
            () => {
              SpaceMonkeyContract.claimReward()
                .then(reward => {
                  console.log('here is your fucking reward you dirty scammer: ', reward);
                })
                .catch(e => { console.log(e) });
            }
          }
        >
          <Card>
            <CardContent>
              <Typography variant="body2" component="p">
                {this.state.reward}
              </Typography>
            </CardContent>
            {/* <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions> */}
          </Card>
        </Button>
      </>
    );
  }
}

const enhance = _.flowRight([
  withDrizzleContextConsumer,
  withAppContextConsumer,
]);

export default enhance(RewardsContainer);

RewardsContainer.propTypes = {
  // to be continued
};