const path = require('path');

module.exports = {
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    });

    config.module.rules.push({
      test: /\.vue$/,
      loader: 'vue-docgen-loader',
      enforce: 'post'
    });

    config.module.rules.push({
      test: /\.tsx?$/,
      loader: 'ts-loader',
      options: {
        appendTsSuffixTo: [/\.vue$/],
        transpileOnly: true
      }
    });

    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.resolve(__dirname, '../'),
    ];

    return config;
  },
  addons: [
    '@storybook/addon-notes/register-panel',
    '@storybook/addon-storysource',
    '@storybook/addon-viewport/register',
    'storybook-addon-vue-info/lib/register',
  ],
};