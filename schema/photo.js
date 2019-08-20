export default `

  type Photo {
    id: Int!
    wpId: Int
    url: String!
    description: String
    vehicle: Vehicle!
  }

  type Query {
    getPhotos: [Photo!]!
    getPhoto(id: ID!): Photo!
  }

  type Mutation {
    createPhoto(wpId: Int!, url: String!, description: String): Photo!
    deletePhoto(id: ID!): Int!
  }

`;
