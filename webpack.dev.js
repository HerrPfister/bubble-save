/* eslint-disable @typescript-eslint/no-var-requires */

const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/examples/index.tsx',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'example.bundle.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    port: 3000,
    compress: true,
    hot: true,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)?$/,
        use: 'babel-loader',
        exclude: '/node_modules/',
      },
      {
        test: /\.(tsx|ts)?$/,
        use: 'ts-loader',
        exclude: '/node_modules/',
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
        exclude: '/node_modules/',
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      inject: true,
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
