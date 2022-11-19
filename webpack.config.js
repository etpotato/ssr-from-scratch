const nodeExternals = require('webpack-node-externals');
const path = require('path');

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
  mode: 'development',
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
};

module.exports = [serverConfig, clientConfig];
