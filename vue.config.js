const { defineConfig } = require('@vue/cli-service')
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  configureWebpack: {
    resolve: {
      fallback: {
        "path": require.resolve("path-browserify"),
      },
    },
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true
    }
  }
};
