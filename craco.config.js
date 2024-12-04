const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          path: require.resolve("path-browserify"),
          fs: false,
          os: false,
          util: false
        }
      },
      output: {
        publicPath: '/kiosk/'
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env': JSON.stringify(process.env),
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        })
      ]
    }
  }
}; 