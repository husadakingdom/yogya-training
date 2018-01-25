const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');

const tokenSecret = 'Y0gy@';

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
      { id: inputs.user.id, jwtid: uuidv4() },
      tokenSecret, // Token secret that we sign it with
      { expiresIn: 86400 } // Token expire time (1 day)
    );

    const users = await User.update({ id: inputs.user.id })
      .set({ accessToken: token }).fetch();

    return exits.success(users[0]);
  }
};
