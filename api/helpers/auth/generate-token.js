const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');

module.exports = {
  description: 'Generate a token from supplied payload',

  inputs: {
    user: {
      description: 'User object',
      type: 'ref',
      required: true
    }
  },

  fn: async(inputs, exits) => {
    const token = jwt.sign(
      { userId: inputs.user.id, jwtid: uuidv4() },
      sails.config.custom.token.secret, // Token secret that we sign it with
      { expiresIn: sails.config.custom.token.expires }
    );

    const users = await User.update({ id: inputs.user.id })
      .set({ accessToken: token }).fetch();

    return exits.success(users[0]);
  }
};
