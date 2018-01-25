const uuidv4 = require('uuid/v4');
const util = require('util');

module.exports = async (req, res, next) => {
  req.ssUuid = uuidv4().split('-')[0]; // set request unique ID
  sails.log.debug(`
       [${(new Date()).toISOString()}] - ${req.ssUuid} \n
       Started ${req.method} "${req.route.path}" for ${req.ip} \n
       ${util.inspect(req.allParams())}
   `); // TODO: filter sensitive info: password, credit card, token, etc
  return next();
};
