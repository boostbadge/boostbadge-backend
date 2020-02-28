import bcrypt from 'bcryptjs';
import models from '../models';

const defaultCoverPhoto =
  'https://boostbadge.com/wp-content/plugins/ultimate-member/assets/img/default_avatar.jpg';
const defaultProfilePhoto =
  'https://boostbadge.com/wp-content/plugins/ultimate-member/assets/img/default_avatar.jpg';

const createUser = async args => {
  const email = args.email.toLowerCase();
  const password = await bcrypt.hash(args.password, 10);

  const existingUser = await models.User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error(`Email already exists: ${email}`);
  }

  const coverPhoto =
    args.coverPhoto != null ? args.coverPhoto : defaultCoverPhoto;
  const profilePhoto =
    args.coverPhoto != null ? args.coverPhoto : defaultProfilePhoto;

  return models.User.create({
    ...args,
    email,
    password,
    coverPhoto,
    profilePhoto,
    deleted: false,
  });
};

export { createUser };
