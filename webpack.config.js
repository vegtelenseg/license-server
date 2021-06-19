const path = require("path");
var nodeExternals = require("webpack-node-externals");
module.exports = {
  entry: path.join(__dirname, "src/index.ts"),
  target: "node",
  mode: "production",
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts"],
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "build"),
  },
};