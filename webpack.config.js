const path = require('path');
const src = path.join(__dirname, '/client/src');
const dist = path.join(__dirname, '/client/dist');


module.exports = {
  watch: true,
  mode: 'production',
  entry: `${src}/index.jsx`,
  module: {
    rules: [{
      test: /\.jsx$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
    path: dist
  }
};