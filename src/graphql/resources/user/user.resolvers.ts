import * as Sequelize from 'sequelize';
import { UserInstance } from './../../../models/UserModel';
import { DbConnection } from './../../../interfaces/DbConnectionInterface';
import { GraphQLResolveInfo } from 'graphql';

export const userResolvers = {
  User: {
    posts: (parent: UserInstance, args, {db}: {db: DbConnection}, info: GraphQLResolveInfo) => {
      return db.Post
        .findAll({
          where: {
            author: parent.get('id')
          },
          limit: args.first || 10,
          offset: args.offset || 10
        });
    }
  },
  Query: {
    users: (parent, args, {db}: {db: DbConnection}, info: GraphQLResolveInfo) => {
      return db.User
        .findAll({
          limit: args.first || 10,
          offset: args.offset || 10
        });
    },
    user: (parent, args, {db}: {db: DbConnection}, info: GraphQLResolveInfo) => {
      return db.User
        .findById(args.id)
        .then((user: UserInstance) => {
          if (!!user) {
            throw new Error(`User with id ${id} not found`);
          }
          return user;
        })
        .catch((err) => console.log(err));
    }
  },
  Mutation: {
    createUser: (parent, args, {db}: {db: DbConnection}, info: GraphQLResolveInfo) => {
      return db.sequelize.transaction((t: Sequelize.Transaction) => {
        return db.User.create(args.input, { transaction: t });
      });
    },
    updateUser: (parent, args, {db}: {db: DbConnection}, info: GraphQLResolveInfo) => {
      let id: number = parseInt(args.id);
      return db.sequelize.transaction((t: Sequelize.Transaction) => {
        return db.User
        .findById(id)
        .then((user: UserInstance) => {
          if (!user) {
            throw new Error(`User with id ${id} not found`);
          }
          return user.update(args.input, { transaction: t });
        })
        .catch(err => console.log(err));
      });
    },
    updateUserPassword: (parent, args, {db}: {db: DbConnection}, info: GraphQLResolveInfo) => {
      let id: number = parseInt(args.id);
      return db.sequelize.transaction((t: Sequelize.Transaction) => {
        return db.User
          .findById(id)
          .then((user: UserInstance) => {
            if (!user) {
              throw new Error(`User with id ${id} not found`);
            }
            return user.update(args.input, { transaction: t})
              .then((user: UserInstance) => !!user)
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      });
    },
    deleteUser: (parent, args, {db}: {db: DbConnection}, info: GraphQLResolveInfo) => {
      let id: number = parseInt(args.id);
      return db.sequelize.transaction((t: Sequelize.Transaction) => {
        return db.User.findById(id)
          .then((user: UserInstance) => {
          if (!user) {
            throw new Error(`User with id ${id} not found`);
          }
          return user.destroy({transaction: t})
            .then((user) => !!user)
            .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      });
    }
  }
};
