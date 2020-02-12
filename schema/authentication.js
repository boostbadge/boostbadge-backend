export default `
  type Query {
    getCurrentUser: User
  }

  type Mutation {
    register(username: String!, email: String!, displayName: String!, firstName: String!, lastName: String!, password: String!): User!

    login(email: String!, password: String!): User!

    logout: SuccessMessage

    requestResetPassword(email: String!): SuccessMessage

    resetPassword(resetToken: String!, password: String!, confirmPassword: String!): User!
  }

`;
