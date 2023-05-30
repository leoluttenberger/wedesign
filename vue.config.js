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
    devtool: "source-map",
    plugins: [
      require("unplugin-vue-components/webpack")({
        /* options */
      }),
    ],
    resolve: {
      fallback: {
        timers: require.resolve("timers-browserify"),
        fs: false,
        os: false,
      },
    },
  },
});