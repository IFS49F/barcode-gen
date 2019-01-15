const CONFIG = {
  app: {
    width: 700,
    height: 700,
    channel: ['canary', 'stable']
  },
  parcel: {
    outDir: './public'
  },
  static: {
    maxage: 600000
  }
};

module.exports = CONFIG;
