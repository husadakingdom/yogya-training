module.exports = async (req, res, next) => {
  if (req.user.role !== 'Admin') {
    return res.apiError(403, sails.config.custom.errorMessage.auth.notAdmin);
  }

  return next();
};
