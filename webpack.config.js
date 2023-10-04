const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const {resolve} = require("path");

module.exports = (env, {mode}) => {
    return {
        mode: mode,
        devtool: 'inline-source-map',
        entry: {
            index: resolve(__dirname, 'src/index.js')
        },
        plugins: [
            new MiniCssExtractPlugin(),
            new HtmlWebpackPlugin({
                template: 'src/index.html',
                inject: 'body'
            })
        ],
        module: {
            rules: [
                {
                    test: /\.(?:js|mjs|cjs)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
                {
                    test: /\.css$/i,
                    // test: /\.less$/i,
                    use: [
                        // extracts css to a separate file
                        MiniCssExtractPlugin.loader,
                        // translates CSS into CommonJS
                        "css-loader",
                        // edits and modifies rules
                        "postcss-loader",
                    ],
                },
                {
                    test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i, // assets config
                    type: 'asset/resource'
                }
            ]
        },
        resolve: {
            symlinks: false // if you don't use symlinks increases resolving speed
        },
        optimization: {
            runtimeChunk: 'single'
        }
    };
};