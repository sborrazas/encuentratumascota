var path = require("path");

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
  },
  progress: true,
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
        loader: "style!css?modules&importLoaders=2&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!less?outputStyle=expanded",
      },
      {
        test: /\.lessraw$/,
        loader: "style!css?importLoaders=2!autoprefixer-loader?browsers=last 2 versions!less?outputStyle=expanded"
      },
    ],
  },
};
