import { useCallback, useEffect, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

function useWeb3Modal(config = {}) {
  const [provider, setProvider] = useState();
  const [autoLoaded, setAutoLoaded] = useState(false);
  const [signedInAddress, setSignedInAddress] = useState("");

  const { autoLoad = true } = config;
  const { setInvalidChain, setInitialized, onLoad } = config;

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
        },
        display: {
          name: "Wallet connect",
          description: "Connect with Wallet Connect",
        },
      },
      injected: {
        display: {
          name: "Injected",
          description: "Connect with the provider in your Browser",
        },
        package: null,
      },
    },
  });

  const setProviderEvents = (newProvider) => {
    newProvider.on("accountsChanged", (accounts) => {
      console.log(accounts);
    });

    newProvider.on("chainChanged", (chainId) => {
      if (parseInt(chainId) != process.env.REACT_APP_CHAIN_ID) {
        setInvalidChain(true);
      } else {
        setInvalidChain(false);
      }
    });
  };

  const loadWeb3Modal = useCallback(async () => {
    const newProvider = await web3Modal.connect();
    if (parseInt(newProvider.chainId) != process.env.REACT_APP_CHAIN_ID) {
      setInvalidChain(true);
    }

    const web3Provider = new Web3Provider(newProvider);
    console.log(web3Provider);

    setProvider(web3Provider);
    setSignedInAddress(newProvider.selectedAddress);
    setProviderEvents(newProvider);
    onLoad(web3Provider, newProvider.selectedAddress);
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
