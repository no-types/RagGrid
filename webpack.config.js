require("@babel/polyfill");
const path = require('path');
const WebpackBar = require('webpackbar');

module.exports = {
  entry: [
    "@babel/polyfill",
    './javascript/RagGrid.js'],
  optimization: {
    // We do not want to minimize our code.
    minimize: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      { test: /\.js(x?)$/, loader: "babel-loader" }
    ]
  },
  output: {
    filename: 'RagGrid.js',
    path: path.resolve(__dirname, './inst/htmlwidgets')
  },
  plugins: [
    new WebpackBar()
  ]
};
