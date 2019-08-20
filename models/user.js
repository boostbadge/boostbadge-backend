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
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      allowNull: false,
      defaultValue: 'user',
    },
    resetToken: {
      type: Sequelize.STRING,
    },
    resetTokenExpiry: {
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
    verified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    profilePhoto: {
      type: Sequelize.STRING,
    },
    coverPhoto: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    url: {
      type: Sequelize.STRING,
    },
    dob: {
      type: Sequelize.DATEONLY,
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
  };

  return User;
};
