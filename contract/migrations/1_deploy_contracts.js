"use strict"

const SpaceMonkey = artifacts.require("SpaceMonkey");

module.exports = function (deployer, network, accounts) {
  deployer.deploy(SpaceMonkey);
};
