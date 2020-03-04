import Sequelize from 'sequelize';

export default {
  Vehicle: {
    user: parent => parent.getUser(),
    photos: parent => parent.getPhotos(),
    likes: async parent => (await parent.getLikes()).length,
    badge: parent => parent.getBadge(),
  },

  Query: {
    listVehicles: (parent, { offset, limit }, { models }) =>
      models.Vehicle.findAll({ offset, limit }),
    getVehicle: (parent, { id }, { models }) =>
      models.Vehicle.findOne({ where: { id } }),
    numOfVehicles: async (parent, args, { models }) => {
      try {
        const results = await models.Vehicle.findAll({
          attributes: [
            [Sequelize.fn('COUNT', Sequelize.col('id')), 'aggregate'],
          ],
        });
        return results[0].dataValues.aggregate;
      } catch (e) {
        return 0;
      }
    },
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
