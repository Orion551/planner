const path = require('path');
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./webpack.common');
const dotenv = require('dotenv');

/**
 * Based on the selected environment (`localhost` | `development`), it fetches the correct `.env` file and retrieves the `PLANNER_SERVICE_BASE_URL` to know which services to head to;
 * @param {String} env - Selected environment
 * @returns {{'process.env': string}} - Returns `PLANNER_SERVICE_BASE_URL`
 */
const loadEnv = (env) => {
  console.log('loading env: ', env);
  const envFile = env === 'localhost' ? '.env.localhost' : '.env.development';
  console.log('envfile: ', envFile);
  dotenv.config({ path: path.resolve(__dirname, envFile) });
  console.log('process.env', process.env);
  return {
    'process.env': JSON.stringify(process.env),
  };
};

// Get the `NODE_ENV` from process.env or default to `development`;
const env = process.env.NODE_ENV || 'development';

// Load the corresponding `.env` file
const envConfig = loadEnv(env);

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),
    },
    compress: true,
    port: 8080,
    open: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
  plugins: [new webpack.DefinePlugin(envConfig)],
});
