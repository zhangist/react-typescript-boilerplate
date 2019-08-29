const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

process.env.NODE_ENV =
  process.env.NODE_ENV === "production" ? "production" : "development";

const config = {
  mode: process.env.NODE_ENV,
  target: "web",
  context: __dirname,
  entry: {
    main: ["./src/Root.tsx"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "",
    filename:
      process.env.NODE_ENV === "production" ? "[name]-[hash].js" : "[name].js",
    chunkFilename:
      process.env.NODE_ENV === "production"
        ? "[name]-[chunkhash].js"
        : "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loaders: ["babel-loader", "ts-loader"],
        include: [path.resolve(__dirname, "src")],
        exclude: [path.resolve(__dirname, "src/i18n")],
      },
      {
        test: /\.(css|scss)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { modules: true },
          },
          ...(process.env.NODE_ENV === "production" ? ["postcss-loader"] : []),
          "sass-loader",
        ],
        exclude: [path.resolve(__dirname, "node_modules")],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".css", ".scss"],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      favicon: "./src/favicon.ico",
    }),
    new CopyWebpackPlugin([{ from: "src/files", to: "files" }]),
  ],
  optimization: {
    runtimeChunk: true,
  },
  devServer: {
    contentBase: path.resolve(__dirname, "src"),
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
      },
    },
    host: "0.0.0.0",
    port: 9000,
    hot: true,
  },
};

// webpack dev server
if (process.env.NODE_ENV === "production") {
  config.optimization = config.optimization || {};
  config.optimization.minimizer = config.optimization.minimizer || [];
  config.optimization.minimizer.push(
    new TerserPlugin({
      parallel: true,
      terserOptions: {
        compress: {
          drop_debugger: true,
          pure_funcs: ["console.log"],
        },
      },
    }),
  );
} else {
  config.entry.main.unshift("webpack-dev-server/client?http://localhost:9000/");
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

// webpack analyzer
if (process.env.analyze) {
  config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;
