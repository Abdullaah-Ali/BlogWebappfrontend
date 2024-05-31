const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    'http://localhost:5000/signup', // Specify the prefix for API requests you want to proxy
    createProxyMiddleware({
      target: 'http://localhost:5000', // Specify the URL of your backend server
      changeOrigin: true,
    })
  );
};
