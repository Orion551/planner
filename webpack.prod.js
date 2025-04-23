const path = require('path');
const dotenv = require('dotenv');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const envFile = path.resolve(__dirname, '.env.development');
const env = dotenv.config({ path: envFile }).parsed;

const loadEnv = () => {
  dotenv.config({ path: path.resolve(__dirname, '.env.production') });
  return {
    'process.env': JSON.stringify(process.env),
  };
};

const envConfig = loadEnv();

module.exports = merge(commonConfig, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  plugins: [new webpack.DefinePlugin(envConfig)],
});
