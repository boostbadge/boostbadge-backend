export default `
  type Photo {
    id: Int!
    wpId: Int
    url: String!
    localUrl: String!
    vehicle: Vehicle!
  }

  type Mutation {
    createPhoto(vehicleId: Int!, wpId: Int!, url: String!, localUrl: String!): Photo!
    deletePhoto(id: ID!): Int!
  }
`;
