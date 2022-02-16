const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = (env, argv) => {
  return {
    entry: {
      index: path.resolve(__dirname, 'src/index.js')
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.html')
      }),
      new ESLintPlugin()
    ],
    devtool: 'eval-source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader?retainLines=true',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: ['@babel/transform-runtime']
            }
          }
        },
        {
          test: /\.css$/i,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource'
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx'],
      alias: {
        '@axios': path.resolve(__dirname, 'src/axios.js'),
        '@assets': path.resolve(__dirname, 'src/assets/'),
        '@components': path.resolve(__dirname, 'src/components/'),
        '@contexts': path.resolve(__dirname, 'src/contexts'),
        '@hooks': path.resolve(__dirname, 'src/hooks/'),
        '@routes': path.resolve(__dirname, 'src/routes/'),
        '@stores': path.resolve(__dirname, 'src/stores/'),
        '@utils': path.resolve(__dirname, 'src/utils')
      }
    },
    devServer: {
      historyApiFallback: true,
      hot: true,
      static: {
        directory: path.resolve(__dirname, 'src/static'),
        publicPath: '/assets'
      }
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            maxSize: 1000000
          }
        }
      }
    },
    performance: {
      maxAssetSize: 5000000,
      maxEntrypointSize: 999999999
    }
  }
}
