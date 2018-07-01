const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  // 提供 mode 配置選項，告知 webpack 使用相應模式的內置優化
  mode: 'development',
  //entry為入口,webpack從這裡開始編譯
  entry: [
    "babel-polyfill",
    path.join(__dirname, './src/index.js')
  ],
  //output為輸出 path代表路徑 filename代表文件名稱
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  //module是配置所有模塊要經過什麼處理
  //test:處理什麼類型的文件,use:用什麼,include:處理這裡的,exclude:不處理這裡的
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: path.join(__dirname, 'js'),
        exclude: /node_modules/
      },
      {
        test: /\.sass$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
        // use: ExtractTextPlugin.extract({
        //   fallback: "style-loader",
        //   use: ['css-loader?modules&localIdentName=[local]-[hash:base64:5]', 'postcss-loader', 'sass-loader']
        // })
      },
      {
        test: /\.pug$/,
        use: ['html-loader', 'pug-html-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }]

      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.join(__dirname , "./src/index.pug"),
      filename: './index.html'
    }),
    new ExtractTextPlugin({
      filename: './index.css'
    }),
  ],
  // optimization: {
  //   splitChunks: {
  //       cacheGroups: {
  //           vendor: {
  //               test: /[\\/]node_modules[\\/]/,
  //               name: 'common',
  //               chunks: 'all'
  //             }
  //         }
  //     }
  // },
  devServer: {
    contentBase: path.join(__dirname, 'bundle'),  //啟動路徑
    host:'localhost',  //domain
    port: 8018,  //port
  },
};