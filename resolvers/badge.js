export default {
  Badge: {
    vehicle: parent => parent.getVehicle(),
  },

  Query: {
    // Must be admin
    listBadges: (parent, args, { models }) =>
      models.Badge.findAll({
        order: [['createdAt', 'DESC']],
      }),
    // Must be admin
    getBadge: (parent, { id }, { models }) =>
      models.Badge.findOne({ where: { id } }),
  },

  Mutation: {
    // Must be admin
    createBadge: async (parent, args, { models }) => models.Badge.create(args),

    // Must be admin
    updateBadge: async (parent, args, { models }) =>
      models.Badge.update(
        {
          vehicleId: args.vehicleId,
          bbId: args.bbId,
          activated: args.activated,
          imageUrl: args.imageUrl,
        },
        {
          where: {
            id: args.id,
          },
        }
      ),

    // Must be admin
    deleteBadge: async (parent, { id }, { models }) =>
      models.Badge.destroy({
        where: {
          id,
        },
      }),
  },
};
