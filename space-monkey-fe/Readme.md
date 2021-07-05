To make it work with Binance Testnet you need to add:

97: { chainId: 97, chain: "BSC-testnet", network: "binance-testnet", networkId: 97 },


to node-modules/web3modal/index.js where there is a json of chains. Just look for BSC, find the JSON, and append it there.