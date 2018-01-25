module.exports = async (req, res, next) => {
  const errMsg = sails.config.custom.errorMessage.auth;

  try {
    if (req.headers && req.headers.authorization) {
      const accessToken = req.headers.authorization.split('Bearer ')[1];

      if (!accessToken) {
        return res.set(401).json({ error: errMsg.headerFormat });
      }

      const decrypted = await sails.helpers.auth.authenticateToken(accessToken);

      const user = await User.findOne(decrypted.userId);
      if (!user) {
        return res.set(401).json({ error: errMsg.userNotFound });
      }

      req.user = user;

      return next();
    } else {
      return res.set(401).json({ error: errMsg.noHeader });
    }
  } catch (err) {
    if (err.exit === 'expiredToken') {
      return res.set(401).json({ error: errMsg.expiredToken });
    }

    return res.set(500).json({ error: err.message });
  }
};
