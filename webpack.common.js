const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { resolve } = require('path');

module.exports = {
  entry: {
    index: resolve(__dirname, 'src/index.js'),
  },
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'build'),
  },
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
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                auto: true,
                localIdentName: '[name]_[local]__[hash:base64:5]',
                exportLocalsConvention: 'camelCaseOnly',
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i, // assets config
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    alias: {
      '@planner': resolve(__dirname, '../', 'planner'),
      '@Assets': resolve(__dirname, './src/', 'Assets'),
      '@Components': resolve(__dirname, './src/', 'Components'),
      '@Pages': resolve(__dirname, './src/', 'Pages'),
      '@Utils': resolve(__dirname, './src/', 'Utils'),
      '@Api': resolve(__dirname, './src/', 'Api'),
    },
    extensions: ['.js', '.json', '.wasm'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
    }),
    new ESLintPlugin(),
  ],
};
