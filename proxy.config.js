const proxy = [
    {
      context: '/projeto-exemplo',
      target: 'http://localhost:8080/home',
      pathRewrite: {'^/projeto-exemplo' : ''}
    }
  ];

  module.exports = proxy;