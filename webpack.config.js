require("babel-polyfill");
const path = require('path');

module.exports = {
  entry: [
    './javascript/RagGrid.js',"babel-polyfill"],
  mode:'development',
  optimization: {
    // We no not want to minimize our code.
    minimize: false
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      { test: /\.js(x?)$/, loader: "babel-loader?presets[]=es2015" }
    ]
  },
  output: {
    filename: 'RagGrid.js',
    path: path.resolve(__dirname, './inst/htmlwidgets')
  }
};
