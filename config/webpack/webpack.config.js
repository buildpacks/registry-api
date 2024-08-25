const path    = require("path")
const webpack = require("webpack")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';

module.exports = {
  mode,
  entry: {
    application: [
      "./app/javascript/application.js",
      './app/assets/stylesheets/application.css',
    ],
  },
  optimization: {
    moduleIds: 'deterministic',
  },
  output: {
    filename: "[name].js",
    chunkFilename: "[name]-[contenthash].digested.js",
    sourceMapFilename: "[file]-[fullhash].map",
    path: path.resolve(__dirname, '..', '..', 'app/assets/builds'),
    hashFunction: "sha256",
    hashDigestLength: 64,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx|)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(?:sa|sc|c)ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|svg)$/i,
        type: 'asset/inline'
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.css', '.png', '.svg'],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new webpack.EnvironmentPlugin({
      CNB_API_HOST: 'https://cnb-registry-api.herokuapp.com'
    })
  ]
}
