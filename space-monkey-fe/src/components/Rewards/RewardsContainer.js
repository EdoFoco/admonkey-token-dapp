// external libraries
import React, { useState } from "react";
import _ from "lodash";
import useWeb3Modal from "../../hooks/useWeb3Modal";
import Web3 from "web3";
// own services
// import { withAppContextConsumer } from "../../services/app-context";
// import { withDrizzleContextConsumer } from "../../services/drizzle";

// smart contracts
import Dashboard from "./rewardsDashboard/Dashboard";
import AdMonkey from "../../contracts/AdMonkey";
import AdMonkeyAbi from "../../contracts/AdMonkeyAbi.json";

import { getTokenTransactionsForWallet } from "../../services/bsscan";

export default function RewardsContainer() {
  const [initialized, setInitialized] = useState();
  const [provider, setProvider] = useState();
  const [reward, setBnbReward] = useState();
  const [balance, setBalance] = useState();
  const [nextAvailableClaimDate, setNextAvailableClaimDate] = useState();
  const [transactions, setTransactions] = useState([]);
  const [invalidChain, setInvalidChain] = useState();
  const [adMonkey, setAdMonkey] = useState();
  const [loading, setLoading] = useState(true);

  const [_, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal({
    setInvalidChain: (isInvalid) => {
      setInitialized(true);
      setInvalidChain(isInvalid);
    },
    onLoad: (provider, selectedAccount) => {
      setInitialized(true);
      setInvalidChain(false);
      setProvider(provider);
      loadAdMonkey(provider, selectedAccount);
    },
  });

  const isClaimButtonDisabled = () => {
    if (null != reward && parseFloat(reward, 10) === 0 && true === true) {
      return false;
    }
    return true;
  };

  const loadAdMonkey = async (provider, account) => {
    // const newProvider = new Web3(provider.provider);
    // console.log(newProvider);
    // const contract = new newProvider.eth.Contract(
    //   AdMonkeyAbi.abi,
    //   process.env.REACT_APP_CONTRACT_ADDRESS
    // );
    // const b = await contract.methods["balanceOf"](account).call();
    // console.log(b);
    if (provider) {
      const adMonkeyContract = new AdMonkey(provider.provider, account);
      await setAdMonkey(adMonkeyContract);

      const balance = await adMonkeyContract.getBalance();
      const bnbReward = await adMonkeyContract.calculateBNBReward();
      const nextAvailableClaimDate =
        await adMonkeyContract.nextAvailableClaimDate();

      const transactions = await getTokenTransactionsForWallet(account);

      setBnbReward(bnbReward / 10 ** 18); // Math.round( * , 12) / 100000000 });
      setBalance(Math.round((balance / 10 ** 9) * 1000, 6) / 1000);
      setNextAvailableClaimDate(new Date(nextAvailableClaimDate * 1000));
      setTransactions(transactions);
      setLoading(false);
    }
  };

  const onClaimReward = () => {
    // SpaceMonkeyContract.claimReward().then((reward) => {
    //   console.log("here is your fucking reward you dirty scammer: ", reward);
    // });
  };

  //   constructor(props) {
  //     super(props);

  //     this.state = {
  //       initialized: false,
  //       reward: null,
  //       balance: null,
  //       nextAvailableClaimDate: null,
  //       transactions: [],
  //       invalidChain: false,
  //       provider: null,
  //       loadWeb3Modal: null,
  //       logoutOfWeb3Modal: null,
  //     };
  //   }

  //   componentDidMount() {

  //     this.setState({
  //       provider: provider,
  //       loadWeb3Modal: loadWeb3Modal,
  //       logoutOfWeb3Modal: logoutOfWeb3Modal,
  //     });

  // const { drizzle } = this.props.drizzleContext;
  // this.unsubscribe = drizzle.store.subscribe(() => {
  //const drizzleState = drizzle.store.getState();
  // if (drizzleState.drizzleStatus.initialized && !this.state.initialized) {
  //     this.setState({ initialized: true });
  //     SpaceMonkeyContract.drizzle = drizzle;
  //     SpaceMonkeyContract.calculateBNBReward()
  //         .then(reward => {
  //             // Todo: Handle BigInts
  //             console.log(`BNB Reward is: ${reward}`);
  //             this.setState({ "reward": reward / (10 ** 18) }),// Math.round( * , 12) / 100000000 });
  //                 console.log(this.state.reward);
  //         });
  //     SpaceMonkeyContract.getBalance()
  //         .then(balance => {
  //             // Todo: Handle BigInts
  //             console.log(`The total balance is: ${balance}`);
  //             this.setState({ "balance": Math.round(balance / (10 ** 9) * 1000, 6) / 1000 });//.toString()
  //         });
  //     SpaceMonkeyContract.nextAvailableClaimDate()
  //         .then(date => {
  //             this.setState({ "nextAvailableClaimDate": new Date(date * 1000) });
  //         });
  //     getTokenTransactionsForWallet(drizzleState.accounts[0])
  //         .then(txns => {
  //             this.setState({ "transactions": txns });
  //         });
  // }
  //});
  //   }

  return (
    <Dashboard
      initialized={initialized}
      reward={reward}
      onClaimReward={onClaimReward}
      isClaimButtonDisabled={isClaimButtonDisabled()}
      balance={balance}
      nextAvailableClaimDate={nextAvailableClaimDate}
      transactions={transactions}
      invalidChain={invalidChain}
      provider={provider}
      loadWeb3Modal={loadWeb3Modal}
      logoutOfWeb3Modal={logoutOfWeb3Modal}
      loading={loading}
    />
  );
}
