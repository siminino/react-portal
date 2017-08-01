const path = require('path');

module.exports = {
  entry: ['./src/portal.js'],
  output: {
    path: path.join(__dirname, './dist'),
    publicPath: path.join(__dirname, './dist'),
    filename: 'portal.js',
    library: 'portal',
    libraryTarget: 'umd'
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  devtool: 'source-map',
  devServer: {
    inline: true,
    contentBase: './'
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
};
