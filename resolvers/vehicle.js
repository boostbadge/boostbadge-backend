export default {
  Vehicle: {
    user: parent => parent.getUser(),
    photos: parent => parent.getPhotos(),
  },

  Query: {
    vehicles: (parent, args, { models }) => models.Vehicle.findAll(),
    vehicle: (parent, { id }, { models }) =>
      models.Vehicle.findOne({ where: { id } }),
  },

  Mutation: {
    createVehicle: async (parent, args, { models }) =>
      models.Vehicle.create(args),
    updateVehicle: async (parent, args, { models }) =>
      models.Vehicle.update(
        {
          wpId: args.wpId,
          userId: args.userId,
          year: args.year,
          make: args.make,
          model: args.model,
          nickname: args.nickname,
          featuredImage: args.nickname,
          instagram: args.instagram,
          facebook: args.facebook,
          miles: args.miles,
          color: args.color,
          trimLevel: args.trimLevel,
          engine: args.engine,
          horsepower: args.horsepower,
          torque: args.torque,
          fuelType: args.fuelType,
          engineMods: args.engineMods,
          drivetrain: args.drivetrain,
          transmission: args.transmission,
          interiorMods: args.interiorMods,
          wheels: args.wheels,
          tires: args.tires,
          curbWeight: args.curbWeight,
          exteriorMods: args.exteriorMods,
          suspension: args.suspension,
          blurb: args.blurb,
          futurePlans: args.futurePlans,
          wheelbase: args.wheelbase,
          acceleratingTime: args.acceleratingTime,
          brakingTime: args.brakingTime,
          quarterMileTime: args.quarterMileTime,
          brakes: args.brakes,
          epa: args.epa,
          awards: args.awards,
          homeState: args.homeState,
          forSale: args.forSale,
          additionalInformation: args.additionalInformation,
          bodyStyle: args.bodyStyle,
        },
        {
          where: {
            id: args.id,
          },
        }
      ),
    deleteVehicle: async (parent, { id }, { models }) =>
      models.Vehicle.destroy({
        where: {
          id,
        },
      }),
  },
};
