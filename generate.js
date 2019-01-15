const bwipjs = require('bwip-js');

const generateToBase64 = (options) => new Promise((resolve, reject) => {
  bwipjs.toBuffer(options, (err, png) => err
    ? reject(typeof err === 'object' ? err.message : err)
    : resolve('data:image/png;base64,' + png.toString('base64')));
});

module.exports = generateToBase64;
