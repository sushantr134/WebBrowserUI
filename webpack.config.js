const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path')

module.exports = {
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name:'[name].[ext]',
              outputPath:'img/',
              publicPath:'img/'

            }
          }
        ]
      },
      {
        test:/\.(s*)css$/,
        use:ExtractTextPlugin.extract({
          fallback:'style-loader',
          use:['css-loader', 'sass-loader'],
          publicPath:'/dist'
        })
      }
    ]
  },
  resolve:{
   alias:{
     'images':path.resolve(__dirname,'src/static')
   }
  },
 plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new ExtractTextPlugin({
      filename:"app.css",
      disable:false,
      allChunks:true
    })
  ]
};