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
    return (
      <AppContext.Provider value={this.state.appContext}>
        <Routes />
      </AppContext.Provider>
    );
  }
}

export default App;
