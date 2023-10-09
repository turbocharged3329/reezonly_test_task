const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
        @import "@/assets/styles/variables.scss";
        @import "@/assets/styles/functions.scss";
        @import "@/assets/styles/main.scss";
        `
      }
    }
  },
  transpileDependencies: true,
})
