const SentryPlugin = require('@sentry/webpack-plugin');

module.exports = {
  productionSourceMap: false,
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
      config.plugins.push(new SentryPlugin({
        include: './dist',
        ignore: ['node_modules', 'webpack.config.js'],
      }));
    } else {
      config.plugins.push(new SentryPlugin({
        include: './src',
        ignore: ['node_modules', 'webpack.config.js'],
      }));
    }
  },
};
