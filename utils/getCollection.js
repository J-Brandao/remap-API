const getFirestore = require("../utils/getFirestore");
module.exports = collectionName =>
   getFirestore().collection(collectionName)