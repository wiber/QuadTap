const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  // Base config for development
  if (!isProduction) {
    return {
      entry: './src/index.js',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'quad-tap.js',
        library: {
          name: 'QuadTap',
          type: 'umd',
          export: 'default',
          umdNamedDefine: true
        },
        globalObject: 'this'
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
      },
      plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          template: './test/index.html',
          filename: 'index.html',
          inject: 'head',
          scriptLoading: 'blocking'
        }),
        new HtmlWebpackPlugin({
          template: './test/video-api-test.html',
          filename: 'video-api-test.html',
          inject: 'head',
          scriptLoading: 'blocking'
        })
      ],
      devServer: {
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
        hot: false,
        liveReload: true
      },
      devtool: 'eval-source-map'
    };
  }

  // Production configuration with separate builds for UMD and ESM
  return {
    // Create separate configurations for UMD and ESM builds
    entry: {
      'quad-tap': './src/index.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      library: {
        name: 'QuadTap',
        type: 'umd',
        export: 'default',
        umdNamedDefine: true
      },
      globalObject: 'this'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './test/index.html',
        filename: 'index.html',
        inject: 'head',
        scriptLoading: 'blocking',
        chunks: ['quad-tap']
      }),
      new HtmlWebpackPlugin({
        template: './test/video-api-test.html',
        filename: 'video-api-test.html',
        inject: 'head',
        scriptLoading: 'blocking',
        chunks: ['quad-tap']
      })
    ],
    optimization: {
      minimize: true
    },
    devtool: 'source-map'
  };
};
