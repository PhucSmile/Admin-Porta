const webpack = require('webpack');

module.exports = function override(config, env) {
  // New config, e.g. config.plugins.push...
  config.resolve.fallback = {
    ...config?.resolve?.fallback,
    process: require.resolve('process/browser'),
    zlib: require.resolve('browserify-zlib'),
    stream: require.resolve('stream-browserify'),
    util: require.resolve('util'),
    buffer: require.resolve('buffer'),
    assert: require.resolve('assert'),
  };

  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    }),
  ];

  config.module.rules.push({
    test: /\.m?js/,
    resolve: {
      fullySpecified: false
    }
  })

  return config;
};
