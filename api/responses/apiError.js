const util = require('util');

module.exports = function apiError (code, error) {
  const req = this.req;
  const res = this.res;

  res.status(code);
  sails.log.error(`
       [${(new Date()).toISOString()}] - ${req.ssUuid} \n
       Got error ${req.method} "${req.route.path}" with HTTP ${code} \n
       ${util.inspect(error)}
   `);

  if (error instanceof Error) {
    error = error.message;
  }

  return res.json({ error });
};
