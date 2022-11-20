const path = require('path');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const serverConfig = {
  mode: 'development',
  target: 'node',
  node: {
    __dirname: false,
  },
  entry: './src/server.js',
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    }],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.bundle.js',
  },
};

const clientConfig = {
  mode: process.env.NODE_ENV || 'development',
  target: 'web',
  entry: path.resolve(__dirname, 'src/public/client.js'),
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
    }],
  },
  output: {
    path: path.resolve(__dirname, 'dist/public'),
    filename: 'client.bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/public/index.html',
      publicPath: 'static',
    }),
  ],
};

module.exports = [serverConfig, clientConfig];
