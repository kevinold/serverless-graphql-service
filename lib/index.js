var _graphql = require('graphql');
var Schema = require('./schema');

module.exports.runGraphQL = function (event, cb) {

  var query = event.body.query;

  _graphql.graphql(Schema, query).then( function(result) {
    //console.log('RESULT: ', result);
    return cb(null, result);
  });

};
