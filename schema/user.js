export default `
  type User {
    id: ID!
    wpId: Int!
    deleted: Boolean!
    email: String!
    displayName: String!
    password: String!
    resetToken: String
    resetTokenExpiry: String
    role: String!
    verified: Boolean
    profilePhoto: String
    profilePhotoThumbnail: String
    coverPhoto: String
    coverPhotoThumbnail: String
    firstName: String!
    lastName: String!
    description: String
    url: String
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
    listUsers: [User!]!
    getUser(id: ID!): User!
  }

  type Mutation {
    createUser(wpId: Int, email: String!, password: String!, displayName: String!, role: String!, verified: Boolean, profilePhoto: String, profilePhotoThumbnail: String, coverPhoto: String, coverPhotoThumbnail: String, firstName: String!, lastName: String!, description: String, url: String, instagram: String, twitter: String, facebook: String, youtube: String, vimeo: String): User!

    updateUser(id: ID!, wpId: Int, email: String!, displayName: String!, role: String!, verified: Boolean, pprofilePhoto: String, profilePhotoThumbnail: String, coverPhoto: String, coverPhotoThumbnail: String, firstName: String!, lastName: String!, description: String, url: String, instagram: String, twitter: String, facebook: String, youtube: String, vimeo: String): [Int!]!

    deleteUser(id: ID!): Int!
  }

`;
