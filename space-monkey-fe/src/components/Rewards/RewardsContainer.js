// external libraries
import React from 'react'
import _ from 'lodash';

// own services
import { withAppContextConsumer } from '../../services/app-context';
import { withDrizzleContextConsumer } from '../../services/drizzle';

// smart contracts
import SpaceMonkeyContract from '../../contracts/SpaceMonkey.js';

class RewardsContainer extends React.Component {

    constructor(props) {
        super(props);

        const { drizzle, drizzleState, initialized } = props.drizzleContext;
        console.log(drizzleState);
        this.web3 = drizzle.web3;
        this.contracts = drizzle.contracts;
        this.drizzleState = drizzleState;

        this.state = {
            initialized: false,
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
                        this.setState({ "reward": reward });
                    });

                SpaceMonkeyContract.getBalance()
                    .then(balance => {
                        this.setState({ "balance": balance });
                    });

                SpaceMonkeyContract.nextAvailableClaimDate()
                    .then(date => {
                        this.setState({ "nextAvailableClaimDate": date });
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
        if(this.drizzleState.accounts.length == 0){
            return(<div>We couldn't find a valid Wallet. Please create a wallet and come back.</div>)
        }
       
        return (
        <div className="reward-container">
            <div className="reward-box">
                <div className="reward-title">Your Reward</div>
                <div className="reward-value">{Math.round((this.state.reward / (10 ** 18) * 100000), 6) / 100000} BNB</div>
                <div className="reward-date">You can withdraw your reward on the {this.state.nextAvailableClaimDate}</div>
                <button className="buy-button" onClick={this.clickMe}>Claim Reward</button>
            </div>
            {/* Your balance is: {this.state.balance / (10 ** 9)} SPC */}
        
        </div>);
    }
}

const enhance = _.flowRight([
    withDrizzleContextConsumer,
    withAppContextConsumer,
]);

export default enhance(RewardsContainer);