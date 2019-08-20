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
    description: {
      type: Sequelize.STRING,
    },
  });

  return Photo;
};
