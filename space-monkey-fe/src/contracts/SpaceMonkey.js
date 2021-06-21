import _ from 'lodash';

const SpaceMonkeyContract = {
    drizzle: null,

    calculateBNBReward: async function () {
        if (!this.drizzle) return;

        const { store } = this.drizzle;
        const myAcct = store.getState().accounts[0];

        const { SpaceMonkey } = this.drizzle.contracts;
        return await SpaceMonkey.methods.calculateBNBReward(myAcct).call();
    },

    getBalance: async function () {
        if (!this.drizzle) return;

        const { store } = this.drizzle;
        const myAcct = store.getState().accounts[0];

        const { SpaceMonkey } = this.drizzle.contracts;
        return await SpaceMonkey.methods.balanceOf(myAcct).call();
    },

    claimReward: async function () {
        if (!this.drizzle) return;

        const { store } = this.drizzle;
        const myAcct = store.getState().accounts[0];

        const { SpaceMonkey } = this.drizzle.contracts;
        return await SpaceMonkey.methods.balanceOf(myAcct).call();
    },

    nextAvailableClaimDate: async function () {
        if (!this.drizzle) return;

        const { store } = this.drizzle;
        const myAcct = store.getState().accounts[0];

        const { SpaceMonkey } = this.drizzle.contracts;
        return await SpaceMonkey.methods.nextAvailableClaimDate(myAcct).call();
    },
}

// Bind all functions to the obj
_.bindAll(SpaceMonkeyContract, Object.keys(SpaceMonkeyContract)
    .filter(k => typeof SpaceMonkeyContract[k] == 'function'));

export default SpaceMonkeyContract
