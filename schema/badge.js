export default `
  type Badge {
    id: ID!
    wpId: Int
    bbId: String!
    activated: Boolean!
    imageUrl: String
    vehicle: Vehicle
  }

  type Query {
    listBadges: [Badge!]!
    getBadge(id: ID!): Badge!
  }

  type Mutation {
    createBadge(vehicleId: Int, bbId: String!, activated: Boolean!, imageUrl: String): Badge!

    updateBadge(id: ID!, vehicleId: Int, bbId: String!, activated: Boolean!, imageUrl: String): [Int!]!

    deleteBadge(id: ID!): Int!
  }

`;
