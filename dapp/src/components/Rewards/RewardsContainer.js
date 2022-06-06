import React, { useState } from "react";
import useWeb3Modal from "../../hooks/useWeb3Modal";
import Dashboard from "./rewardsDashboard/Dashboard";
import AdMonkey from "../../contracts/AdMonkey";
import AdMonkeyV2 from "../../contracts/AdMonkeyV2";
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
  const [adMonkeyV2, setAdMonkeyV2] = useState();
  const [v2Balance, setV2Balance] = useState();
  const [loading, setLoading] = useState(true);
  const [chainId, setChainId] = useState(null);
  const [claimedRewardTransaction, setClaimedRewardTransaction] =
    useState(null);

  const [_, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal({
    setChainId: (chainId) => {
      setChainId(chainId);
    },
    setInvalidChain: (isInvalid) => {
      setInitialized(true);
      setInvalidChain(isInvalid);
    },
    onLoad: (provider, selectedAccount) => {
      setInitialized(true);
      setInvalidChain(false);
      setProvider(provider);
      loadAdMonkey(provider, selectedAccount);
      loadAdMonkeyV2(provider, selectedAccount);
      setLoading(false);
    },
  });

  const isClaimButtonDisabled = () => {
    if (null != reward && parseFloat(reward, 10) !== 0) {
      return false;
    }
    return true;
  };

  const loadAdMonkey = async (provider, account) => {
    setChainId(JSON.stringify(account));
    if (provider) {
      const adMonkeyContract = new AdMonkey(provider.provider, account);
      await setAdMonkey(adMonkeyContract);

      const balance = await adMonkeyContract.getBalance();
      const bnbReward = await adMonkeyContract.calculateBNBReward();
      let nextAvailableClaimDate =
        await adMonkeyContract.nextAvailableClaimDate();

      nextAvailableClaimDate =
        nextAvailableClaimDate && nextAvailableClaimDate > 0
          ? new Date(nextAvailableClaimDate * 1000)
          : null;

      const transactions = await getTokenTransactionsForWallet(account);

      setBnbReward(bnbReward / 10 ** 18);
      setBalance(Math.round((balance / 10 ** 9) * 1000, 6) / 1000);
      setNextAvailableClaimDate(nextAvailableClaimDate);
      setTransactions(transactions);
    }
  };

  const loadAdMonkeyV2 = async (provider, account) => {
    setChainId(JSON.stringify(account));
    if (provider) {
      const adMonkeyContract = new AdMonkeyV2(provider.provider, account);
      await setAdMonkeyV2(adMonkeyContract);

      const balance = await adMonkeyContract.getBalance();

      setV2Balance(Math.round((balance / 10 ** 9) * 1000, 6) / 1000);
      console.log(`V2 balance is: ${balance}`);
    }
  };

  const onClaimReward = async () => {
    if (adMonkey) {
      const tx = await adMonkey.claimBnbReward();
      const nextClaimDate = await adMonkey.nextAvailableClaimDate();
      setNextAvailableClaimDate(null);
      setClaimedRewardTransaction(tx.transactionHash);
    }
  };

  return (
    <div>
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
        claimedRewardTransaction={claimedRewardTransaction}
      />
    </div>
  );
}
