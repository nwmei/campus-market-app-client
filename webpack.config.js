const HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  output: {
    publicPath: "/",
    filename: "bundle.js"
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(graphql|gql)$/,
        loader: 'graphql-tag/loader'
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        use: [
          'file-loader',
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new webpack.ProvidePlugin({
      "React": "react",
    })
  ],
  target: 'node',
  devServer: {
    historyApiFallback: true,
    port: 3000
  },
}