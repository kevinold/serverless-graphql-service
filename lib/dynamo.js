'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPost = createPost;
exports.getPosts = getPosts;
exports.getAuthor = getAuthor;
exports.getAuthors = getAuthors;
exports.getComments = getComments;
exports.getAllJokes = getAllJokes;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dynamoConfig = {
  sessionToken: process.env.AWS_SESSION_TOKEN,
  region: process.env.AWS_REGION
};
var docClient = new _awsSdk2.default.DynamoDB.DocumentClient(dynamoConfig);
var stage = 'dev';
var projectName = 'serverless-graphql-service';
var postsTable = projectName + '-posts-' + stage;
var authorsTable = projectName + '-authors-' + stage;
var commentsTable = projectName + '-comments-' + stage;

function createPost(post) {
  return new _bluebird2.default(function (resolve, reject) {
    var params = {
      TableName: postsTable,
      Item: post
    };

    docClient.put(params, function (err, data) {
      if (err) return reject(err);
      return resolve(post);
    });
  });
}

function getPosts() {
  return new _bluebird2.default(function (resolve, reject) {
    var params = {
      TableName: postsTable,
      AttributesToGet: ['id', 'title', 'author', 'bodyContent']
    };

    docClient.scan(params, function (err, data) {
      if (err) return reject(err);
      return resolve(data["Items"]);
    });
  });
}

function getAllJokes() {
  return new _bluebird2.default(function (resolve, reject) {
    var params = {
      TableName: jokesTable,
      AttributesToGet: ['id', 'body', 'author']
    };

    docClient.scan(params, function (err, data) {
      if (err) return reject(err);
      return resolve(data["Items"]);
    });
  });
}

function getJokeAuthor(id) {
  return new _bluebird2.default(function (resolve, reject) {
    var params = {
      TableName: authorsTable,
      Key: {
        id: id
      },
      AttributesToGet: ['id', 'name']
    };

    docClient.get(params, function (err, data) {
      if (err) return reject(err);
      return resolve(data["Item"]);
    });
  });
}

function getAuthor(id) {
  return new _bluebird2.default(function (resolve, reject) {
    var params = {
      TableName: authorsTable,
      Key: {
        id: id
      },
      AttributesToGet: ['id', 'name']
    };

    docClient.get(params, function (err, data) {
      if (err) return reject(err);
      return resolve(data["Item"]);
    });
  });
}

function getAuthors() {
  return new _bluebird2.default(function (resolve, reject) {
    var params = {
      TableName: authorsTable,
      AttributesToGet: ['id', 'name']
    };

    docClient.scan(params, function (err, data) {
      if (err) return reject(err);
      return resolve(data["Items"]);
    });
  });
}

function getComments() {
  return new _bluebird2.default(function (resolve, reject) {
    var params = {
      TableName: commentsTable,
      AttributesToGet: ['id', 'content', 'author']
    };

    docClient.scan(params, function (err, data) {
      if (err) return reject(err);
      return resolve(data["Items"]);
    });
  });
}
