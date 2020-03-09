export const getHash = str => {
    const buffer = require('buffer').Buffer;
    return new Buffer(str).toString("base64");
  };
  