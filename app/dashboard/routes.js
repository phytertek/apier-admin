const { getAppConfig } = require('./controllers');
// const { authorizeRoute } = require('../services').Auth

module.exports = {
  '/dashboard': {
    // middleware: [authorizeRoute],
    // head: {},
    get: {
      '/get-app-config': getAppConfig
    },
    post: {},
    patch: {},
    delete: {}
  }
};
