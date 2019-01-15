const carlo = require('carlo');
const { app: appConfig } = require('./config');
const generateToBase64 = require('./generate');

(async () => {
  const app = await carlo.launch(appConfig);
  app.on('exit', () => process.exit());
  app.serveFolder(`${__dirname}/app`);
  await app.exposeFunction('generateToBase64', generateToBase64);
  await app.load('index.html#pdf417');
})();
