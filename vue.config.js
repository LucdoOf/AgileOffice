module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/stylesheets/main.scss";
        `
      }
    }
  },
  publicPath: ''
}
