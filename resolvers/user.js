import Sequelize from 'sequelize';
import bcrypt from 'bcryptjs';

export default {
  User: {
    vehicles: parent => parent.getVehicles(),
  },

  Query: {
    listUsers: (parent, { offset, limit }, { models }) =>
      models.User.findAll({
        offset,
        limit,
        order: [
          ['verified', 'DESC'],
          ['createdAt', 'DESC'],
        ],
      }),
    getUser: (parent, { id }, { models }) =>
      models.User.findOne({ where: { id } }),
    numOfUsers: async (parent, args, { models }) => {
      try {
        const results = await models.User.findAll({
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
    // Must be admin
    createUser: async (parent, args, { models }) => {
      const email = args.email.toLowerCase();
      const password = await bcrypt.hash(args.password, 10);

      const existingUser = await models.User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error(`Email already exists: ${email}`);
      }

      models.User.create({
        ...args,
        email,
        password,
        deleted: false,
      });
    },

    updateUser: async (parent, args, { models }) =>
      models.User.update(
        {
          wpId: args.wpId,
          email: args.email,
          displayName: args.displayName,
          role: args.role,
          verified: args.verified,
          profilePhoto: args.profilePhoto,
          profilePhotoThumbnail: args.profilePhoto,
          coverPhoto: args.coverPhoto,
          coverPhotoThumbnail: args.coverPhoto,
          firstName: args.firstName,
          lastName: args.lastName,
          description: args.description,
          url: args.url,
          instagram: args.instagram,
          twitter: args.twitter,
          facebook: args.facebook,
          youtube: args.youtube,
          vimeo: args.vimeo,
        },
        {
          where: {
            id: args.id,
          },
        }
      ),

    // Must be admin
    deleteUser: async (parent, { id }, { models }) =>
      models.User.update(
        {
          deleted: true,
        },
        {
          where: {
            id,
          },
        }
      ),
  },
};
