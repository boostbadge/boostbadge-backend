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
    featuredImage: {
      type: Sequelize.STRING,
    },
    nickname: {
      type: Sequelize.STRING,
    },
    instagram: {
      type: Sequelize.STRING,
    },
    facebook: {
      type: Sequelize.STRING,
    },
    miles: {
      type: Sequelize.STRING,
    },
    color: {
      type: Sequelize.STRING,
    },
    trimLevel: {
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
    fuelType: {
      type: Sequelize.STRING,
    },
    engineMods: {
      type: Sequelize.STRING,
    },
    drivetrain: {
      type: Sequelize.STRING,
    },
    transmission: {
      type: Sequelize.STRING,
    },
    interiorMods: {
      type: Sequelize.STRING,
    },
    wheels: {
      type: Sequelize.STRING,
    },
    tires: {
      type: Sequelize.STRING,
    },
    curbWeight: {
      type: Sequelize.STRING,
    },
    exteriorMods: {
      type: Sequelize.STRING,
    },
    suspension: {
      type: Sequelize.STRING,
    },
    blurb: {
      type: Sequelize.STRING,
    },
    futurePlans: {
      type: Sequelize.STRING,
    },
    wheelbase: {
      type: Sequelize.STRING,
    },
    acceleratingTime: {
      type: Sequelize.STRING,
    },
    brakingTime: {
      type: Sequelize.STRING,
    },
    quarterMileTime: {
      type: Sequelize.STRING,
    },
    brakes: {
      type: Sequelize.STRING,
    },
    epa: {
      type: Sequelize.STRING,
    },
    awards: {
      type: Sequelize.STRING,
    },
    homeState: {
      type: Sequelize.STRING,
    },
    forSale: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    additionalInformation: {
      type: Sequelize.STRING,
    },
    bodyStyle: {
      type: Sequelize.STRING,
    },
  });

  Vehicle.associate = models => {
    Vehicle.belongsTo(models.User);
    Vehicle.hasMany(models.Photo);
  };

  return Vehicle;
};
