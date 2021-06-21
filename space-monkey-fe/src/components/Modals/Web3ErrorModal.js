// external libraries
import React from 'react'


export default class Web3ErrorModal extends React.Component {
    render() {
        return (<div>
            You have not connected to Binance Smart Chain network yet
            To use the Dapp, make sure:
            You are using the Binance Smart Chain network
            Please switch to BSC Network if you use:
            Metamask
            TrustWallet
            Binance Chain Extension Wallet
            SafePal
            Hint: The app works best if you use Metamask/TrustWallet
        </div>);
    }
}
