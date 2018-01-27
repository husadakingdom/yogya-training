module.exports = async (req, res, next) => {
  const errMsg = sails.config.custom.errorMessage.auth;

  try {
    if (req.headers && req.headers.authorization) {
      const accessToken = req.headers.authorization.split('Bearer ')[1];

      if (!accessToken) {
        return res.apiError(401, errMsg.headerFormat);
      }

      const decrypted = await sails.helpers.auth.authenticateToken(accessToken);

      const user = await User.findOne({ id: decrypted.userId, accessToken });
      if (!user) {
        return res.apiError(401, errMsg.userNotFound);
      }

      req.user = user;

      return next();
    } else {
      return res.apiError(401, errMsg.noHeader);
    }
  } catch (err) {
    if (err.exit === 'expiredToken') {
      return res.apiError(401, errMsg.expiredToken);
    }

    return res.apiError(500, err);
  }
};
