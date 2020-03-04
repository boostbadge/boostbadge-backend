export default `
  type Vehicle {
    id: ID!
    wpId: Int!
    featuredImage: String
    featuredImageCover: String
    featuredImageFull: String
    forSale: Boolean!
    year: Int!
    make: String!
    model: String!
    nickname: String
    location: String
    description: String
    exteriorColor: String
    interiorColor: String
    miles: String
    awards: String
    vin: String
    engine: String
    horsepower: String
    torque: String
    transmission: String
    suspension: String
    wheels: String
    tires: String
    brakes: String
    curbWeight: String
    modifications: String
    topSpeed: String
    acceleratingTime: String
    quarterMileTime: String
    brakingTime: String
    url: String
    instagram: String
    facebook: String
    likes: Int
    photos: [Photo]
    user: User!
    badge: Badge
  }

  type Query {
    listVehicles(offset: Int, limit: Int): [Vehicle!]!
    getVehicle(id: ID!): Vehicle!
    numOfVehicles: Int!
  }

  type Mutation {
    createVehicle(wpId: Int!, badgeId: Int, featuredImage: String, featuredImageCover: String, featuredImageFull: String, forSale: Boolean!, year: Int!, make: String!, model: String!, nickname: String, location: String, description: String, exteriorColor: String, interiorColor: String, miles: String, awards: String, vin: String, engine: String, horsepower: String, torque: String, transmission: String, suspension: String, wheels: String, tires: String, brakes: String, curbWeight: String, modifications: String, topSpeed: String, acceleratingTime: String, quarterMileTime: String, brakingTime: String, url: String, instagram: String, facebook: String): Vehicle!

    updateVehicle(id: ID!, badgeId: Int, wpId: Int!, featuredImage: String, featuredImageCover: String, featuredImageFull: String, forSale: Boolean!, year: Int!, make: String!, model: String!, nickname: String, location: String, description: String, exteriorColor: String, interiorColor: String, miles: String, awards: String, vin: String, engine: String, horsepower: String, torque: String, transmission: String, suspension: String, wheels: String, tires: String, brakes: String, curbWeight: String, modifications: String, topSpeed: String, acceleratingTime: String, quarterMileTime: String, brakingTime: String, url: String, instagram: String, facebook: String): [Int!]!

    deleteVehicle(id: ID!): Int!
  }

`;
