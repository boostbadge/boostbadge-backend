import Sequelize from 'sequelize';

export default sequelize => {
  const Vehicle = sequelize.define('vehicle', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    wpId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    featuredImage: {
      type: Sequelize.STRING,
    },
    featuredImageCover: {
      type: Sequelize.STRING,
    },
    featuredImageFull: {
      type: Sequelize.STRING,
    },
    forSale: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      default: false,
    },
    year: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    make: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    model: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    nickname: {
      type: Sequelize.STRING,
    },
    location: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    exteriorColor: {
      type: Sequelize.STRING,
    },
    interiorColor: {
      type: Sequelize.STRING,
    },
    miles: {
      type: Sequelize.STRING,
    },
    awards: {
      type: Sequelize.STRING,
    },
    vin: {
      type: Sequelize.STRING,
    },
    engine: {
      type: Sequelize.STRING,
    },
    horsepower: {
      type: Sequelize.STRING,
    },
    torque: {
      type: Sequelize.STRING,
    },
    transmission: {
      type: Sequelize.STRING,
    },
    suspension: {
      type: Sequelize.STRING,
    },
    wheels: {
      type: Sequelize.STRING,
    },
    tires: {
      type: Sequelize.STRING,
    },
    brakes: {
      type: Sequelize.STRING,
    },
    curbWeight: {
      type: Sequelize.STRING,
    },
    modifications: {
      type: Sequelize.STRING,
    },
    topSpeed: {
      type: Sequelize.STRING,
    },
    acceleratingTime: {
      type: Sequelize.STRING,
    },
    quarterMileTime: {
      type: Sequelize.STRING,
    },
    brakingTime: {
      type: Sequelize.STRING,
    },
    url: {
      type: Sequelize.STRING,
    },
    instagram: {
      type: Sequelize.STRING,
    },
    facebook: {
      type: Sequelize.STRING,
    },
  });

  Vehicle.associate = models => {
    Vehicle.belongsTo(models.User);
    Vehicle.hasMany(models.Photo);
    Vehicle.hasMany(models.Like);
    Vehicle.hasOne(models.Badge);
  };

  return Vehicle;
};
