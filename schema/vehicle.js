export default `

  type Vehicle {
    id: ID!
    wpId: Int!
    year: Int!
    make: String!
    model: String!
    nickname: String
    featuredImage: String
    instagram: String
    facebook: String
    miles: String
    color: String
    trimLevel: String
    engine: String
    horsepower: String
    torque: String
    fuelType: String
    engineMods: String
    drivetrain: String
    transmission: String
    interiorMods: String
    wheels: String
    tires: String
    curbWeight: String
    exteriorMods: String
    suspension: String
    blurb: String
    futurePlans: String
    wheelbase: String
    acceleratingTime: String
    brakingTime: String
    quarterMileTime: String
    brakes: String
    epa: String
    awards: String
    homeState: String
    forSale: Boolean
    additionalInformation: String
    bodyStyle: String
    photos: [Photo]
    user: User!
  }

  type Query {
    getVehicles: [Vehicle!]!
    getVehicle(id: ID!): Vehicle!
  }

  type Mutation {
    createVehicle(wpId: Int!, userId: Int!, year: Int!, make: String!, model: String!, nickname: String, instagram: String, facebook: String, miles: String, color: String, trimLevel: String, engine: String, horsepower: String, torque: String, fuelType: String, engineMods: String, drivetrain: String, transmission: String, interiorMods: String, wheels: String, tires: String, curbWeight: String, exteriorMods: String, suspension: String, blurb: String, futurePlans: String, wheelbase: String, acceleratingTime: String, brakingTime: String, quarterMileTime: String, brakes: String, epa: String, awards: String, homeState: String, forSale: Boolean, additionalInformation: String, bodyStyle: String): Vehicle!

    updateVehicle(id: ID!, wpId: Int!, userId: Int!, year: Int!, make: String!, model: String!, nickname: String, instagram: String, facebook: String, miles: String, color: String, trimLevel: String, engine: String, horsepower: String, torque: String, fuelType: String, engineMods: String, drivetrain: String, transmission: String, interiorMods: String, wheels: String, tires: String, curbWeight: String, exteriorMods: String, suspension: String, blurb: String, futurePlans: String, wheelbase: String, acceleratingTime: String, brakingTime: String, quarterMileTime: String, brakes: String, epa: String, awards: String, homeState: String, forSale: Boolean, additionalInformation: String, bodyStyle: String): [Int!]!

    deleteVehicle(id: ID!): Int!
  }

`;
