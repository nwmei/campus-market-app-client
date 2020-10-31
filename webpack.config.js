const HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(graphql|gql)$/,
        loader: 'graphql-tag/loader'
      }
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