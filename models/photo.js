import Sequelize from 'sequelize';

export default sequelize => {
  const Photo = sequelize.define('photo', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    wpId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
    },
    url: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    localUrl: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  Photo.associate = models => {
    Photo.belongsTo(models.Vehicle);
  };

  return Photo;
};
