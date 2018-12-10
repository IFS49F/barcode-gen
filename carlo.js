const carlo = require('carlo');
const bwipjs = require('bwip-js');
const { app: appConfig } = require('./config');

const generateToBase64 = (options) => new Promise((resolve, reject) => {
  bwipjs.toBuffer(options, (err, png) => err
    ? reject(err)
    : resolve('data:image/png;base64,' + png.toString('base64')));
});

(async () => {
  const app = await carlo.launch(appConfig);
  app.on('exit', () => process.exit());
  app.serveFolder(`${__dirname}/app`);
  await app.exposeFunction('generateToBase64', generateToBase64);
  await app.load('index.html#pdf417');
})();
