const path = require('path');
const dotenv = require('dotenv');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const envFile = path.resolve(__dirname, '.env.development');
const env = dotenv.config({ path: envFile }).parsed;

const envKeys = Object.keys(env).reduce((acc, key) => {
  acc[`process.env.${key}`] = JSON.stringify(env[key]);
  return acc;
}, {});

module.exports = merge(commonConfig, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  plugins: [new webpack.DefinePlugin(envKeys)],
});
