const util = require('util');
const jwt = require('jsonwebtoken');

module.exports = {
  description: 'Authenticate a JWT',

  inputs: {
    token: {
      type: 'string',
      required: true,
      description: 'Encrypted token'
    }
  },

  exits: {
    expiredToken: {
      description: 'Expired token'
    }
  },

  fn: async (inputs, exits) => {
    try {
      const verifyAsync = util.promisify(jwt.verify);

      const decrypted = await verifyAsync(
        inputs.token, // The token to be verified
        sails.config.custom.token.secret
      );

      return exits.success(decrypted);
    } catch (err) {
      sails.log.error(err);
      throw 'expiredToken';
    }
  }
};
