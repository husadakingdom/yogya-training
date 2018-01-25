const util = require('util');

module.exports = function apiSuccess(data = {}) {
  const req = this.req;
  const res = this.res;
  res.status(200);
  sails.log.debug(`
        [${(new Date()).toISOString()}] - ${req.ss_uuid} \n
        Completed ${req.method} "${req.route.path}" with HTTP 200 \n
        ${util.inspect(data)}
    `); // TODO: Filter sensitive information
  return res.json(data);
};
