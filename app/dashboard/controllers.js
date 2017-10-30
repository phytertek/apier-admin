// const 'Insert Model Name' = require('../database').'Insert Model Name'
const { sendUserError } = require('../common/errors');
const getAppConfig = require('../common/getAppConfig');

module.exports = {
  getAppConfig: async (req, res) => {
    try {
      res.json(getAppConfig());
    } catch (error) {
      sendUserError(error, res);
    }
  }
};
