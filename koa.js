const Koa = require('koa');
const Router = require('koa-router');
const body = require('koa-body');
const conditional = require('koa-conditional-get');
const serve = require('koa-static');
const Bundler = require('parcel-bundler');
const Path = require('path');
const { parcel: parcelConfig, static: staticConfig } = require('./config');
const generateToBase64 = require('./generate');

const router = new Router();

router.post('/generate', body(), async (ctx) => {
  const options = ctx.request.body;
  try {
    ctx.body = await generateToBase64(options);
  } catch (err) {
    ctx.body = err;
    ctx.status = 400;
  }
});

const app = new Koa();

app.use(router.routes());
app.use(conditional());
app.use(serve(parcelConfig.outDir, staticConfig));

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Listening on port ${port}...`);

const parcelEntry = Path.join(__dirname, './app/index.html');

new Bundler(parcelEntry, parcelConfig).bundle();
