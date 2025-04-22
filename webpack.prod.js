const path = require('path');
const dotenv = require('dotenv');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const webpack = require('webpack');

dotenv.config({ path: path.resolve(__dirname, '.env.production') });

const envConfig = {
  'process.env.APP_VERSION': JSON.stringify(process.env.APP_VERSION),
  'process.env.REACT_APP_PLANNER_SERVICE_BASE_URL': JSON.stringify(
    process.env.REACT_APP_PLANNER_SERVICE_BASE_URL
  ),
};

module.exports = merge(commonConfig, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [new webpack.DefinePlugin(envConfig)],
});
