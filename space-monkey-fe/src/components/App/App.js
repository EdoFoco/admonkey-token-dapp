// import libraries
import React, { Component } from 'react';
import _ from 'lodash';
import AppContext from '../../services/app-context';
import Routes from '../Routes';
import Dashboard from '../Rewards/rewardsDashboard/Dashboard';
import Web3ErrorModal from '../Modals/Web3ErrorModal';
import { MainLayout } from '../Layout';
// import {
//   withDrizzleContextProvider,
//   withDrizzleContextConsumer
// } from '../../services/drizzle';
import Web3 from "web3";
import Web3Modal, { WalletConnectProvider } from "web3modal";

const initWeb3 = async () => {
  const providerOptions = {
    injected: {
      display: {
        logo: "data:image/gif;base64,INSERT_BASE64_STRING",
        name: "Injected",
        description: "Connect with the provider in your Browser"
      },
      package: null
    },
    // Example with WalletConnect provider
    walletconnect: {
      display: {
        name: "Mobile",
        description: "Scan qrcode with your mobile wallet"
      },
      package: WalletConnectProvider,
      options: {
        infuraId: "INFURA_ID" // required
      }
    }
  };

  const web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions // required
  });

  const provider = await web3Modal.connect();

  const web3 = new Web3(provider);
  console.log(web3);
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialized: false,
    };
  }


  componentDidMount() {
    initWeb3().then(() => {
      console.log('hello');
    });
  }

  render() {
    // const { drizzleState, initialized } = this.props.drizzleContext;

    // console.log(drizzleState);
    // if (!window.ethereum)
    //   return (<MainLayout><Web3ErrorModal /></MainLayout>);

    // if (!initialized)
    //   return <div>Loading...</div>

    // if (drizzleState.web3.networkId != process.env.REACT_APP_CHAIN_ID)
    //   return (<MainLayout><Web3ErrorModal /></MainLayout>);

    return (
      <div>Hello</div>
      // <AppContext.Provider value={this.state.appContext}>
      //   <Routes />
      // </AppContext.Provider>
    );
  }
}

// React compose pattern FTW.
// const enhance = _.flowRight([
//   withDrizzleContextProvider,
//   withDrizzleContextConsumer
// ]);

export default App;// enhance(App);
