/* mode: development or production*/
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  // devtool: 'source-map',production
  entry: './src/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    library: {
      name: "QueryBuilder",
      type: "umd",
      export: "default"
    }
  },
  performance: { hints: false },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: "babel-loader"
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'lib'),
    },
    watchFiles: ['src/**/*'],
    hot: true,
    // open: true,
    compress: true,
    port: 9000,
  }
};