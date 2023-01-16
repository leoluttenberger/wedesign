// Raw data Config for handling bas64 storaged file
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,

  chainWebpack: (config) => {
    config.module
      .rule("raw")
      .test(/.txt$/)
      .use("raw-loader")
      .loader("raw-loader")
      .end();
  },
  configureWebpack: {
    plugins: [
      require("unplugin-vue-components/webpack")({
        /* options */
      }),
    ],
  },
});
