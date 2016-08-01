'use strict';

var lib = require('./lib');

// Your first function handler
module.exports.hello = (event, context, cb) => cb(null,
  { message: 'Go Serverless v1.0! Your function executed successfully!', event }
);

// You can add more handlers here, and reference them in serverless.yaml
module.exports.graphql = function(event, context) {

  //cb(null, { message: 'TEST', event });

  lib.runGraphQL(event, function (error, response) {
    return context.done(error, response);
  });
};
