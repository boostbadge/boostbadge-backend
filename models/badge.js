import Sequelize from 'sequelize';

export default sequelize => {
  const Badge = sequelize.define('badge', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    wpId: {
      type: Sequelize.INTEGER,
    },
    bbId: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    activated: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      default: false,
    },
    imageUrl: {
      type: Sequelize.STRING,
    },
  });

  Badge.associate = models => {
    Badge.belongsTo(models.Vehicle);
  };

  return Badge;
};
