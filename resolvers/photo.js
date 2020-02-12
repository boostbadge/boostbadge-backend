export default {
  Mutation: {
    createPhoto: async (parent, args, { models }) => models.Photo.create(args),
    deletePhoto: async (parent, { id }, { models }) =>
      models.Photo.destroy({
        where: {
          id,
        },
      }),
  },
};
