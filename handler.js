'use strict';

var _graphql = require('graphql');
var Schema = require('./lib/schema');

// Your first function handler
module.exports.hello = (event, context, cb) => cb(null,
  { message: 'Go Serverless v1.0! Your function executed successfully!', event }
);

// You can add more handlers here, and reference them in serverless.yaml
module.exports.graphql = function(event, context, cb) {

  var query = event.body.query;

  _graphql.graphql(Schema, query).then(function(result) {
    //console.log('RESULT: ', result);
    return cb(null, result);
  });
};
