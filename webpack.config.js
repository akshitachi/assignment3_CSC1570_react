module.exports = {
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    },
    entry: './src/index.js', // Replace with your entry file
    output: {
      filename: '.', // Replace with your output file
      path: __dirname + '/dist' // Output directory for compiled CSS
    }
  };
