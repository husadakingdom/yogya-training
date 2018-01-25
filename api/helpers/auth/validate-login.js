const bcrypt = require('bcrypt');

module.exports = {
  inputs: {
    email: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    }
  },

  exits: {
    userNotFound: {
      description: 'User not found'
    },
    invalidPassword: {
      description: 'Invalid password'
    }
  },

  fn: async (inputs, exits) => {
    const user = await User.findOne({
      email: inputs.email
    });

    if (!user) {
      throw 'userNotFound';
    }

    if (!bcrypt.compareSync(inputs.password, user.password)) {
      throw 'invalidPassword';
    }

    return exits.success(user);
  }
};
