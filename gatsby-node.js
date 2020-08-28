// const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

function onCreateWebpackConfig({ actions, stage, loaders }) {
  const config = {
    // plugins: [
    //   new webpack.ProvidePlugin({
    //     jQuery: 'jquery',
    //     $: 'jquery',
    //     jquery: 'jquery',
    //   }),
    // ],
    module: {
      rules: [
        {
          test: /\.(scss)$/,
          use: [{
            loader: 'style-loader', // inject CSS to page
          }, {
            loader: 'css-loader', // translates CSS into CommonJS modules
            options: {
              esModule: false,
            },
          }, {
            loader: 'postcss-loader', // Run postcss actions
            options: {
              // postcss plugins, can be exported to postcss.config.js
              plugins: () => [autoprefixer],
            },
          }, {
            // compiles Sass to CSS
            loader: 'sass-loader',
          }],
        },
      ],
    },
  };
  if (stage === 'build-html') {
    config.module.rules.push(
      {
        test: require.resolve('bootstrap'),
        use: loaders.null(),
      },
      // {
      //   test: require.resolve('bootstrap/js/dist/util'),
      //   use: loaders.null(),
      // },
    );
  }
  actions.setWebpackConfig(config);
}

exports.onCreateWebpackConfig = onCreateWebpackConfig;
