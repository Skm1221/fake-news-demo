const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: __dirname,
  entry: [
    '@babel/polyfill',
    `${__dirname}/src/index.jsx`
  ],
  devtool: 'source-map',
  output: {
    path: `${__dirname}/static/`,
    filename: 'bundle.js'
  },
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css']
  },
  module: {
    rules: [
      {
        test: /\.js(x)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  node: {
    __dirname: false,
    fs: 'empty'
  }
};
