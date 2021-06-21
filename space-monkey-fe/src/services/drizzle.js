import React from 'react';
import { Drizzle, generateStore } from 'drizzle';
import { DrizzleContext } from 'drizzle-react';
import Web3 from 'web3';
const web3 = new Web3(window.ethereum);

// import smart contracts
import SpaceMonkeyAbi from '../contracts/SpaceMonkeyAbi.json';

const drizzleOpts = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: process.env.FALLBACK_WEB3_URL
    },
  },
  contracts: [
    {
      contractName: 'SpaceMonkey',
      web3Contract: new web3.eth.Contract(SpaceMonkeyAbi.abi, process.env.REACT_APP_CONTRACT_ADDRESS) // An instance of a Web3 contract
    }
  ],
  events: {},
  polls: {
    accounts: 2000,
  }
};

const drizzleStore = generateStore(drizzleOpts);
const drizzle = new Drizzle(drizzleOpts, drizzleStore);

function withDrizzleContextProvider(Component) {
  return class extends React.Component {
    render() {
      return (<DrizzleContext.Provider drizzle={drizzle}>
        <Component />
      </DrizzleContext.Provider>)
    }
  }
}

function withDrizzleContextConsumer(Component) {
  return class extends React.Component {
    render() {
      return (<DrizzleContext.Consumer>{drizzleContext =>
        <Component drizzleContext={drizzleContext} {...this.props} />
      }</DrizzleContext.Consumer>)
    }
  }
}

export {
  drizzleOpts, withDrizzleContextProvider,
  withDrizzleContextConsumer
}
