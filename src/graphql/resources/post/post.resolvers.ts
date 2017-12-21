import { PostInstance } from './../../../models/PostModel';
import { DbConnection } from './../../../interfaces/DbConnectionInterface';
import { GraphQLResolveInfo } from 'graphql';
import { Transaction } from 'sequelize';

export const postResolvers = {

  Post: {
    author: (parent, args, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
      return db.User
        .findById(parent.get('author'));
    },
    comments: (parent, args, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
      return db.Comment
        .findAll({
          where: {
            post: parent.get('id');
          },
          limit: args.limit || 10,
          offset: args.offset || 10
        });
    }
  },

  Query: {
    posts: (parent, args, {db}: {db: DbConnection}, info: GraphQLResolveInfo) => {
     return db.Post
        .findAll({
          limit: args.first || 10,
          offset: args.offset || 10
        });
    },

    post: (parent, args, {db}: {db: DbConnection}, info: GraphQLResolveInfo) => {
      return db.Post
        .findById(args.id)
        .then((post: PostInstance) => {
          if (!post) throw new Error(`Post with id ${args.id} not found`);
          return post;
        })
        .catch((err) => console.log(err))
    }
  },

  Mutation: {
    createPost: (parent, args, {db}: {db: DbConnection}, info: GraphQLResolveInfo) => {
      return db.sequelize.transaction((t: Transaction) => {
        return db.Post.create(args.input, { transaction: t });
      })
    }
  }
}