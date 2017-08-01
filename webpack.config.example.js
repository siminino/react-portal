var path = require("path");

module.exports = {
  entry: [
    "./examples/index.js"
  ],
  output: {
    path: __dirname,
    publicPath: "/",
    filename: "examples/bundle.js"
  },
  devtool: "source-map",
  devServer: {
    inline: true,
    contentBase: "./"
  },
  resolve: {
    extensions: [ ".js", ".jsx" ],
    modules: [ path.join(__dirname, "node_modules") ]
  },
  resolveLoader: {
    modules: [ path.join(__dirname, "node_modules") ]
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.json$/,
        loader: "json"
      }
    ]
  }
};
