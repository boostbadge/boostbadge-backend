import Sequelize from 'sequelize';

export default sequelize => {
  const Like = sequelize.define('like', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });

  Like.associate = models => {
    Like.belongsTo(models.User);
    Like.belongsTo(models.Vehicle);
  };

  return Like;
};
