const userTypes: string = `
  # User Definition Type
  type User {
    id: ID!
    name: String!
    email: String!
    photo: String
    createdAt: String!
    updatedAt: String!
    posts(first: Int, offset: Int): [ Post! ]!
  }

  input UserCreateInput {
    name: String!
    email: String!
    password: String!
  }

  input UserUpdateInput {
    name: String!
    email: String!
    photo: String!
  }

  input UserUpdatePasswordInput {
    password: String!
  }
`;

const userQueries: string = `
  users(first: Int, offset: Int): [ User! ]!
  user(id: ID!): User
`;

const userMutations: string = `
  createUser(input: UserCreateInput!): User
  updateUser(id: ID!, input: UserUpdateInput!): User
  updateUserPasswordInput(id: ID!, input: UserUpdatePasswordInput!): Boolean
  deleteUser(id: ID!): Boolean
`;

export {
  userTypes,
  userQueries,
  userMutations
};
