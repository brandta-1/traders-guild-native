const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  // Customize the config before returning it.

  if (config.mode == 'development') {
    config.devServer = {
      proxy: {
        '/graphql': 'http://localhost:4001/graphql'
      }
    }
  }

  return config;
};
