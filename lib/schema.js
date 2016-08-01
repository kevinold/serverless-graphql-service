'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _graphqlCustomTypes = require('graphql-custom-types');

var _dynamo = require('./dynamo');

var Author = new _graphql.GraphQLObjectType({
  name: "Author",
  description: "Author of the blog post",
  fields: function fields() {
    return {
      id: { type: _graphql.GraphQLString },
      name: { type: _graphql.GraphQLString }
    };
  }
});

var Comment = new _graphql.GraphQLObjectType({
  name: "Comment",
  description: "Comment on the blog post",
  fields: function fields() {
    return {
      id: { type: _graphql.GraphQLString },
      content: { type: _graphql.GraphQLString },
      author: {
        type: Author,
        resolve: function resolve(_ref) {
          var author = _ref.author;

          return (0, _dynamo.getAuthor)(author);
        }
      }
    };
  }
});

var Post = new _graphql.GraphQLObjectType({
  name: "Post",
  description: "Blog post content",
  fields: function fields() {
    return {
      id: { type: _graphql.GraphQLString },
      title: { type: _graphql.GraphQLString },
      bodyContent: { type: _graphql.GraphQLString },
      author: {
        type: Author,
        resolve: function resolve(_ref2) {
          var author = _ref2.author;

          return (0, _dynamo.getAuthor)(author);
        }
      },
      comments: {
        type: new _graphql.GraphQLList(Comment),
        resolve: function resolve(post) {
          return (0, _dynamo.getComments)();
        }
      }
    };
  }
});

var Query = new _graphql.GraphQLObjectType({
  name: 'BlogSchema',
  description: "Root of the Blog Schema",
  fields: function fields() {
    return {
      posts: {
        type: new _graphql.GraphQLList(Post),
        description: "List of posts in the blog",
        resolve: function resolve(source, _ref3) {
          var category = _ref3.category;

          return (0, _dynamo.getPosts)();
        }
      },
      authors: {
        type: new _graphql.GraphQLList(Author),
        description: "List of Authors",
        resolve: function resolve() {
          return (0, _dynamo.getAuthors)();
        }
      },
      author: {
        type: Author,
        description: "Get Author by id",
        args: {
          id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
        },
        resolve: function resolve(source, _ref4) {
          var id = _ref4.id;

          return (0, _dynamo.getAuthor)(author);
        }
      }
    };
  }
});

var Mutuation = new _graphql.GraphQLObjectType({
  name: 'BlogMutations',
  fields: {
    createPost: {
      type: Post,
      description: "Create blog post",
      args: {
        id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
        title: { type: new _graphqlCustomTypes.GraphQLLimitedString(10, 30) },
        bodyContent: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
        author: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString), description: "Id of the author" }
      },
      resolve: function resolve(source, args) {
        return (0, _dynamo.createPost)(args);
      }
    }
  }
});

var Schema = new _graphql.GraphQLSchema({
  query: Query,
  mutation: Mutuation
});

exports.default = Schema;