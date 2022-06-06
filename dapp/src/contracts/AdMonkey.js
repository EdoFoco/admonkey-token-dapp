import AdMonkeyAbi from "./AdMonkeyAbi.json";
import Web3 from "web3";

export default class AdMonkey {
  constructor(provider, account) {
    this.provider = new Web3(provider);
    this.account = account;
    this.contract = new this.provider.eth.Contract(
      AdMonkeyAbi.abi,
      process.env.REACT_APP_CONTRACT_ADDRESS
    );
  }

  async calculateBNBReward() {
    if (!this.provider) return;
    return await this.contract.methods.calculateBNBReward(this.account).call();
  }

  async getBalance() {
    if (!this.provider) return;
    return await this.contract.methods.balanceOf(this.account).call();
  }

  async claimBnbReward() {
    if (!this.provider) return;
    return await this.contract.methods
      .claimBNBReward()
      .send({ from: this.account });
  }

  async nextAvailableClaimDate() {
    if (!this.provider) return;
    return await this.contract.methods
      .nextAvailableClaimDate(this.account)
      .call();
  }
}
