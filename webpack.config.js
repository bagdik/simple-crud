import path from 'path';
import {fileURLToPath} from 'url';
import webpack from 'webpack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  name: 'server',
  mode: 'production',
  target: 'node',
  entry: [ './src/server.js' ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.bundle.cjs',
    libraryTarget: 'commonjs2'
  },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /.js$/,
                loader: 'babel-loader',
                include: path.resolve(__dirname, 'src/'),
                exclude: /node_modules/,
                options: {
                    presets:
                        [['@babel/preset-env',],],
                    plugins: [
                        ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
                        '@babel/plugin-proposal-class-properties'
                    ]
                }
            },
        ]
    }
};