## How do you run this locally

### Setup your environment with Binance TestNet

To make it work with Binance Testnet you need to add the following to node-modules/web3modal/index.js where there is a json of chains. Just look for BSC, find the JSON, and append it there.

```
97: { chainId: 97, chain: "BSC-testnet", network: "binance-testnet", networkId: 97 },
```
