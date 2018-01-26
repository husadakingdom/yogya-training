module.exports = {
  description: 'Wrapper for default upload function that return promise',
  inputs: {
    req: {
      type: 'ref',
      required: true
    },
    opts: {
      type: 'ref'
    },
    paramName: {
      type: 'string',
      required: true
    }
  },

  fn: async function(inputs, exits) {
    const opts = Object.assign({
      dirname: '../../.tmp/public'
    }, inputs.opts);
    inputs.req.file(inputs.paramName).upload(opts, (err, uploadedFiles) => {
      if (err) {
        return exits.error(err);
      }

      return exits.success(uploadedFiles);
    });
  }
};
