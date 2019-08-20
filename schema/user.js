export default `
  scalar Date

  type SuccessMessage {
    message: String
  }

  type User {
    id: ID!
    wpId: Int!
    username: String!
    email: String!
    password: String!
    role: String!
    resetToken: String
    resetTokenExpiry: String
    firstName: String!
    lastName: String!
    verified: Boolean
    profilePhoto: String
    coverPhoto: String
    description: String
    url: String
    dob: Date
    instagram: String
    twitter: String
    facebook: String
    youtube: String
    vimeo: String
    createdAt: Date
    updatedAt: Date
    vehicles: [Vehicle]
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!
    currentUser: User
  }

  type Mutation {
    createUser(wpId: Int!, username: String!, email: String!, role: String!, firstName: String!, lastName: String!, verified: Boolean, profilePhoto: String, coverPhoto: String, description: String, url: String, dob: Date, instagram: String, twitter: String, facebook: String, youtube: String, vimeo: String): User!

    updateUser(id: ID!, wpId: Int, username: String, email: String, role: String, firstName: String, lastName: String, verified: Boolean, profilePhoto: String, coverPhoto: String, description: String, url: String, dob: Date, instagram: String, twitter: String, facebook: String, youtube: String, vimeo: String): [Int!]!

    register(username: String!, email: String!, firstName: String!, lastName: String!,password: String!): User!

    login(email: String!, password: String!): User!

    logout: SuccessMessage

    requestReset(email: String!): SuccessMessage
    resetPassword(resetToken: String!, password: String!, confirmPassword: String!): User!

    deleteUser(id: ID!): Int!
  }

`;
