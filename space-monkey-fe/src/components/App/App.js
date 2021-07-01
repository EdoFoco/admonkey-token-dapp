// import libraries
import React, { Component } from "react";
import _ from "lodash";
import AppContext from "../../services/app-context";
import Routes from "../Routes";
import Dashboard from "../Rewards/rewardsDashboard/Dashboard";
import Web3ErrorModal from "../Modals/Web3ErrorModal";
import { MainLayout } from "../Layout";
// import {
//   withDrizzleContextProvider,
//   withDrizzleContextConsumer
// } from '../../services/drizzle';
import Web3 from "web3";
import Web3Modal, { WalletConnectProvider } from "web3modal";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialized: false,
    };
  }

  render() {
    // const { drizzleState, initialized } = this.props.drizzleContext;

    //console.log(drizzleState);
    // if (!window.ethereum)
    //   return (<MainLayout><Web3ErrorModal /></MainLayout>);

    // if (!initialized)
    //   return <div>Loading...</div>

    // if (drizzleState.web3.networkId != process.env.REACT_APP_CHAIN_ID)
    //   return (<MainLayout><Web3ErrorModal /></MainLayout>);

    return (
      //<div>Hello</div>
      <AppContext.Provider value={this.state.appContext}>
        <Routes />
      </AppContext.Provider>
    );
  }
}

// React compose pattern FTW.
// const enhance = _.flowRight([
//   withDrizzleContextProvider,
//   withDrizzleContextConsumer
// ]);

export default App; //.enhance(App);
