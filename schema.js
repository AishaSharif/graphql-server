const graphql = require('graphql');
const {GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = graphql;

const posts = [
    {
        title: 'Welcome Post',
        description: 'Introduction and purpose of blog',
        author: 'HealthyU'
    },
    {
      title: 'Second Post',
      description: 'Second Post Content',
      author: 'HealthyU'
    }
]

const authors = {
  'HealthyU': {
    name: 'HealthyU',
    prof: 'Healthcare'
  },
  'FoodPlus': {
    name: 'FoodPlus',
    prof: 'Organic'
  }
}

const authorType = new GraphQLObjectType({
  name: 'Author',
  fields: {
    name: {
      type: GraphQLString
    },
    prof: {
      type: GraphQLInt
    }
  }
});

const postType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    title: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    author: {
      type: authorType,
      resolve: (source, params) => {
        return authors[source.author]
      }
    }
  }
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    post: {
      type: postType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (source, {id}) => {
        return posts[id]
      }
    },
    posts: {
      type: new GraphQLList(postType),
      resolve: () => {
        return posts
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: queryType
});

module.exports = schema;