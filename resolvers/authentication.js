import Sequelize from 'sequelize';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import { promisify } from 'util';

export default {
  Query: {
    getCurrentUser: (parent, args, { models, req }, info) => {
      const { userId } = req;
      if (!userId) {
        return null;
      }
      return models.User.findOne({ where: { id: userId } }, info);
    },
  },

  Mutation: {
    register: async (parent, args, { models, res }) => {
      const email = args.email.toLowerCase();
      const password = await bcrypt.hash(args.password, 10);

      const existingUser = await models.User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error(`Email already exists: ${email}`);
      }

      const user = models.User.create({
        ...args,
        email,
        password,
      }).catch(function(err) {
        console.log(err);
      });

      const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
      });

      return user;
    },

    login: async (parent, { email, password }, { models, res }) => {
      const user = await models.User.findOne({ where: { email } });
      if (!user) {
        throw new Error(`No such user found for email ${email}`);
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new Error(`Invalid Password.`);
      }
      const token = await jwt.sign({ userId: user.id }, process.env.APP_SECRET);
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
      });
      return user;
    },

    logout: async (parent, args, { res }) => {
      res.clearCookie('token');
      return { message: 'You have been logged out.' };
    },

    requestResetPassword: async (parent, { email }, { models }) => {
      const user = await models.User.findOne({ where: { email } });
      if (!user) {
        throw new Error(`No such user found for email ${email}`);
      }
      const resetToken = (await promisify(randomBytes)(20)).toString('hex');
      const resetTokenExpiry = Date.now() + 3600000;
      user.update({
        resetToken,
        resetTokenExpiry,
      });
      return { message: 'A password reset has been sent.' };
    },

    resetPassword: async (parent, args, { models, res }) => {
      if (args.password !== args.confirmPassword) {
        throw new Error(`The passwords do not match.`);
      }
      const [user] = await models.User.findAll({
        where: {
          resetToken: args.resetToken,
          resetTokenExpiry: { [Sequelize.Op.gte]: Date.now() - 3600000 },
        },
      });
      if (!user) {
        throw new Error(`This token is either invalid or expired.`);
      }
      const password = await bcrypt.hash(args.password, 10);
      user.update({
        password,
        resetToken: null,
        resetTokenExpiry: null,
      });
      const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
      });
      return user;
    },
  },
};
