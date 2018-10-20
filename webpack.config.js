require("@babel/polyfill");
const path = require('path');

module.exports = {
  entry: [
    './javascript/RagGrid.js',"@babel/polyfill"],
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
  }
};
