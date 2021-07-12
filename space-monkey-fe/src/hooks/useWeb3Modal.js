import { useCallback, useEffect, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

function useWeb3Modal(config = {}) {
  const [provider, setProvider] = useState();
  const [autoLoaded, setAutoLoaded] = useState(false);
  const [signedInAddress, setSignedInAddress] = useState("");

  const { autoLoad = true } = config;
  const { setInvalidChain, setInitialized, onLoad, setChainId } = config;

  const rpcOptions = {};
  rpcOptions[process.env.REACT_APP_CHAIN_ID] =
    process.env.REACT_APP_BSC_RPC_ENDPOINT;

  const web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          rpc: rpcOptions,
          //network: "binance",
        },
        display: {
          name: "Mobile",
          description:
            "Connect with mobile apps compatible with Wallet Connect",
        },
      },
      injected: {
        display: {
          name: "Web",
          description: "Connect with the most common web extensions",
        },
        package: null,
      },
    },
  });

  const setProviderEvents = (newProvider) => {
    newProvider.on("accountsChanged", (accounts) => {
      //console.log(accounts);
    });

    newProvider.on("chainChanged", (chainId) => {
      //(parseInt(chainId));
      if (parseInt(chainId) != process.env.REACT_APP_CHAIN_ID) {
        setInvalidChain(true);
      } else {
        setInvalidChain(false);
      }
    });
  };

  const loadWeb3Modal = useCallback(async () => {
    const newProvider = await web3Modal.connect();
    console.log(newProvider);
    //setChainId(parseInt(newProvider.chainId));
    if (parseInt(newProvider.chainId) != process.env.REACT_APP_CHAIN_ID) {
      setInvalidChain(true);
      return;
    }

    const web3Provider = new Web3Provider(newProvider);

    //console.log(newProvider);
    let selectedAddress = newProvider.selectedAddress;
    if (!selectedAddress) {
      // handle wallet connect address
      if (newProvider.accounts) {
        selectedAddress = newProvider.accounts[0];
      }

      // handle trust wallet
      if (newProvider.address) {
        selectedAddress = newProvider.address;
      }
    }

    //console.log(selectedAddress);
    setChainId(JSON.stringify(newProvider.address));

    setProvider(web3Provider);
    setSignedInAddress(selectedAddress);
    setProviderEvents(newProvider);
    onLoad(web3Provider, selectedAddress);
  }, [web3Modal]);

  const logoutOfWeb3Modal = useCallback(
    async function () {
      setSignedInAddress("");
      await web3Modal.clearCachedProvider();
      window.location.reload();
    },
    [web3Modal]
  );

  useEffect(() => {
    if (autoLoad && !autoLoaded && web3Modal.cachedProvider) {
      loadWeb3Modal();
      setAutoLoaded(true);
    }

    if (!provider) {
      web3Modal.clearCachedProvider();
    }
  }, [
    autoLoad,
    autoLoaded,
    loadWeb3Modal,
    setAutoLoaded,
    web3Modal.cachedProvider,
  ]);

  return [provider, loadWeb3Modal, logoutOfWeb3Modal, signedInAddress];
}

export default useWeb3Modal;
