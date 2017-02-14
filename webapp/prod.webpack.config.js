var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "index.js"),
  // Add resolve.extensions.
  // '' is needed to allow imports without an extension.
  // Note the .'s before extensions as it will fail to match without!!!
  resolve: {
    extensions: ["", ".js", ".jsx"],
    alias: {
      "resources": path.join(__dirname, "javascripts", "resources"),
      "reducers": path.join(__dirname, "javascripts", "reducers"),
      "components": path.join(__dirname, "javascripts", "components"),
      "utils": path.join(__dirname, "javascripts", "utils"),
      "config": path.join(__dirname, "javascripts", "config"),
      "styles": path.join(__dirname, "stylesheets"),
    },
  },
  output: {
    path: path.join(__dirname, "..", "public", "javascripts"),
    filename: "index.js",
    libraryTarget: "umd",
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          plugins: ["lodash"],
          presets: ["es2015", "react", "stage-0"],
        }
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract(
          "style",
          "css?modules&importLoaders=2&sourceMap!autoprefixer-loader?browsers=last 2 versions!less?outputStyle=expanded&sourceMap=true&sourceMapContents=true"
        ),
      },
      {
        test: /\.lessraw$/,
        loader: ExtractTextPlugin.extract(
          "style",
          "css?importLoaders=2!autoprefixer-loader?browsers=last 2 versions!less?outputStyle=expanded"
        ),
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin(
      path.join("../stylesheets", "application.css"),
      {
        allChunks: true,
      }
    ),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ],
};
