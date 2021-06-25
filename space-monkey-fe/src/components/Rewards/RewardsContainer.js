// external libraries
import React from 'react'
import _ from 'lodash';

// own services
import { withAppContextConsumer } from '../../services/app-context';
import { withDrizzleContextConsumer } from '../../services/drizzle';

// smart contracts
import SpaceMonkeyContract from '../../contracts/SpaceMonkey';
import Dashboard from './rewardsDashboard/Dashboard';

import { getTokenTransactionsForWallet } from '../../services/bsscan';


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
                        console.log(reward);
                        this.setState({ "reward": Math.round(reward / (10 ** 18) * 100000, 6) / 100000 });
                    });

                SpaceMonkeyContract.getBalance()
                    .then(balance => {
                        // Todo: Handle BigInts
                        this.setState({ "balance": (balance).toString() });
                    });

                SpaceMonkeyContract.nextAvailableClaimDate()
                    .then(date => {
                        this.setState({ "nextAvailableClaimDate": new Date(date * 1000) });
                    });

                SpaceMonkeyContract.claimReward()
                    .then(date => {
                        console.log("Claimed");
                    })
                    .catch(e => {
                        console.log("Error claiming", e);
                    })

                getTokenTransactionsForWallet(drizzleState.accounts[0])
                    .then(txns => {
                        this.setState({ "transactions": txns });
                    });

            }
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    clickMe() {
        alert("You clicked me!");
    }

    render() {
        if (this.drizzleState.accounts.length === 0) {
            return (<div>We couldn't find a valid Wallet. Please create a wallet and come back.</div>)
        }

        return (
            <Dashboard
                reward={this.state.reward}
                balance={this.state.balance}
                nextAvailableClaimDate={this.state.nextAvailableClaimDate}
                transactions={this.state.transactions} />
        );
    }
}

const enhance = _.flowRight([
    withDrizzleContextConsumer,
    withAppContextConsumer,
]);

export default enhance(RewardsContainer);
