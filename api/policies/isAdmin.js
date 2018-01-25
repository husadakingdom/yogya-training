module.exports = async (req, res, next) => {
  if (req.user.role !== 'Admin') {
    return res.set(403).json({ error: sails.config.custom.errorMessage.auth.notAdmin });
  }

  return next();
};
