export default {
  Photo: {
    vehicle: parent => parent.getVehicle(),
  },

  Query: {
    getPhotos: (parent, args, { models }) => models.Photo.findAll(),
    getPhoto: (parent, { id }, { models }) => models.Photo.findOne({ where: { id } }),
  },

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
