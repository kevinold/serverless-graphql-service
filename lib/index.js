var _graphql = require('graphql');
var Schema = require('./schema');

module.exports.runGraphQL = function (event, cb) {

  var query = event.query;
  //console.log('QUERY: ', query);

  // patch to allow queries from GraphiQL
  // like the initial introspectionQuery
  if (event.query && event.query.hasOwnProperty('query')) {
    query = event.query.query.replace("\n", ' ', "g");
  }

  _graphql.graphql(Schema, query).then( function(result) {
    //console.log('RESULT: ', result);
    return cb(null, result);
  });

};
