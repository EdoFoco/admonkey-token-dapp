/* eslint-disable */

const rewire = require("rewire");
const defaults = rewire("react-scripts/scripts/build.js");
let config = defaults._get_("config");

config.optimization.splitChunks = {
  cacheGroups: {
    default: false,
  },
};

config.optimization.runtimeChunk = false;
