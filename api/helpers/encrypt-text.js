const bcrypt = require('bcrypt');

module.exports = {
  friendlyName: 'Encrypt text',
  description: 'Transform plain text to an encrypted string',
  inputs: {
    plainText: {
      type: 'string',
      example: 'Ami',
      description: 'The plain text',
      required: true
    }
  },

  fn: async function(inputs, exits) {
    const plainText = inputs.plainText;

    if (typeof plainText === 'number') {
      plainText = plainText.toString();
    }

    const encrypted = bcrypt.hashSync(plainText, 10);
    return exits.success(encrypted);
  }
};
