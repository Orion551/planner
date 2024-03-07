const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { resolve } = require('path');

module.exports = (env, { mode }) => {
  return {
    mode: mode,
    devtool: 'inline-source-map',
    entry: {
      index: resolve(__dirname, 'src/index.js'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        inject: 'body',
      }),
      new ESLintPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.(?:js|mjs|cjs)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i, // assets config
          type: 'asset/resource',
        },
      ],
    },
    resolve: {
      symlinks: false,
      extensions: ['', '.js', '.jsx', '.json', '.css'],
    },
  };
};
