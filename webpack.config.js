'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = new function () {
  this.entry = './src/index';

  this.output = {
    filename: './public/bundle.js',
    library: 'index'
  };

  this.watch = NODE_ENV === 'development';

  this.watchOptions = {
    aggregateTimeout: 100
  };

  this.devtool = NODE_ENV === 'development' ? 'cheap-inline-module-source-map' : 'source-map';

  this.plugins = [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    })
  ];

  this.module = {
    loaders: [
      {
        test: /\.jsx?$/, loader: 'babel?presets[]=es2015'
      }
    ]
  };

  this.resolve = {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js']
  };

  this.resolveLoader = {
    modulesDirectories: ['node_modules'],
    moduleTemplates: ['*-loader', '*'],
    extensions: ['', '.js']
  };

  if (NODE_ENV === 'production') {
    this.plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        unsafe: true
      }
    }))
  }
}();
