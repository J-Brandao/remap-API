const { memoize } = require("lodash");
const Firestore = require("@google-cloud/firestore");

module.exports = memoize(() =>
  new Firestore({ keyFilename: ".api_key.json" }));