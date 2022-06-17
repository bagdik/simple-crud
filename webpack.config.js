import path from 'path';

export default {
  mode: 'production',
  entry: './src/server.js',
  output: {
    path: path.resolve('./', 'dist'),
    filename: 'build.js',
  },
  // resolve: {
  //   fallback: {
  //     "fs": false,
  //     "path": false,
  //     "os": false,
  //     "http": false,
  //   }
  // }
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
         loader: 'babel-loader',
         options: {
          presets: ['@babel/preset-env']
         }
        }
      },
    ],
   },
}