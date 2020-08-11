module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080/',
        secure: true
      }
    },
    port: '3000'
  }
}
