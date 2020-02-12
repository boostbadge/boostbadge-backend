export default {
  Vehicle: {
    user: parent => parent.getUser(),
    photos: parent => parent.getPhotos(),
    likes: async parent => (await parent.getLikes()).length,
    badge: parent => parent.getBadge(),
  },

  Query: {
    listVehicles: (parent, args, { models }) => models.Vehicle.findAll(),
    getVehicle: (parent, { id }, { models }) =>
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
          featuredImage: args.featuredImage,
          forSale: args.forSale,
          year: args.year,
          make: args.make,
          model: args.model,
          nickname: args.nickname,
          location: args.location,
          description: args.description,
          exteriorColor: args.color,
          interiorColor: args.color,
          miles: args.miles,
          awards: args.awards,
          vim: args.vin,
          engine: args.engine,
          horsepower: args.horsepower,
          torque: args.torque,
          transmission: args.transmission,
          suspension: args.suspension,
          wheels: args.wheels,
          tires: args.tires,
          brakes: args.brakes,
          curbWeight: args.curbWeight,
          modifications: args.modifications,
          topSpeed: args.topSpeed,
          acceleratingTime: args.acceleratingTime,
          quarterMileTime: args.quarterMileTime,
          brakingTime: args.brakingTime,
          url: args.url,
          instagram: args.instagram,
          facebook: args.facebook,
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
