const { join } = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  entry: join(__dirname, 'src', 'index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: join(__dirname, 'public', 'index.html'),
    }),
  ],
};
