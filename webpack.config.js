const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? 'quad-tap.min.js' : 'quad-tap.js',
      library: {
        name: 'QuadTap',
        type: 'umd',
        export: 'default',
        umdNamedDefine: true
      },
      iife: true,
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
      // Add a second HTML plugin for the video API test page
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
      hot: false, // Disable HMR to avoid conflict with module chunk format
      liveReload: true // Use liveReload instead for development
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    optimization: {
      minimize: isProduction
    },
    // Add ESM output configuration
    experiments: {
      outputModule: true
    },
    // Generate ESM version alongside UMD
    // This will create both quad-tap.js (UMD) and quad-tap.esm.js (ESM)
    // when running in production mode
    ...(isProduction && {
      entry: {
        'quad-tap': './src/index.js',
        'quad-tap.esm': './src/index.js'
      },
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: {
          name: 'QuadTap',
          type: 'umd',
          export: ['default', 'SettingsBuilder', 'VideoPlayerAdapter', 'Coordinates'],
          umdNamedDefine: true
        },
        iife: true,
        globalObject: 'this'
      }
    })
  };
};
