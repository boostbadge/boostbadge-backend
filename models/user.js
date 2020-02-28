import Sequelize from 'sequelize';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    wpId: {
      type: Sequelize.INTEGER,
    },
    deleted: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      default: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    displayName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    resetToken: {
      type: Sequelize.STRING,
    },
    resetTokenExpiry: {
      type: Sequelize.STRING,
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      allowNull: false,
      defaultValue: 'user',
    },
    verified: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    profilePhoto: {
      type: Sequelize.STRING,
    },
    profilePhotoThumbnail: {
      type: Sequelize.STRING,
    },
    coverPhoto: {
      type: Sequelize.STRING,
    },
    coverPhotoThumbnail: {
      type: Sequelize.STRING,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
    },
    url: {
      type: Sequelize.STRING,
    },
    instagram: {
      type: Sequelize.STRING,
    },
    twitter: {
      type: Sequelize.STRING,
    },
    facebook: {
      type: Sequelize.STRING,
    },
    youtube: {
      type: Sequelize.STRING,
    },
    vimeo: {
      type: Sequelize.STRING,
    },
  });

  User.associate = models => {
    User.hasMany(models.Vehicle);
    User.hasMany(models.Like);
  };

  return User;
};
