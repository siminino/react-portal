var path = require("path");

module.exports = {
  entry: [
    "./examples/main.js"
  ],
  output: {
    path: __dirname,
    publicPath: "/",
    filename: "demo/bundle.js"
  },
  devtool: "source-map",
  devServer: {
    inline: true,
    contentBase: "./"
  },
  resolve: {
    extensions: [ "", ".js", ".jsx" ],
    fallback: path.join(__dirname, "node_modules")
  },
  resolveLoader: {
    root: path.join(__dirname, "node_modules")
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: "babel"
      },
      {
        test: /\.json$/,
        loader: "json"
      }
    ]
  }
};
