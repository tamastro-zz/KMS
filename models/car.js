'use strict';
module.exports = function (sequelize, DataTypes) {
  var Car = sequelize.define('Car', {
    brand: DataTypes.STRING,
    type: DataTypes.STRING,
    price: DataTypes.INTEGER
  })
  Car.associate = (models) => {
    Car.belongsToMany(models.User, {
      through: `Bridge`,
      foreignKey: `CarId`
    })
  };
  return Car;
};
