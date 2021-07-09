import React, { useState } from "react";
import useWeb3Modal from "../../hooks/useWeb3Modal";
import Dashboard from "./rewardsDashboard/Dashboard";
import AdMonkey from "../../contracts/AdMonkey";
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
    if (null != reward && parseFloat(reward, 10) !== 0) {
      return false;
    }
    return true;
  };

  const loadAdMonkey = async (provider, account) => {
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

  const onClaimReward = async () => {
    if (adMonkey) {
      await adMonkey.claimBnbReward();
      const nextClaimDate = await adMonkey.nextAvailableClaimDate();
      setNextAvailableClaimDate(null);
    }
  };

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
