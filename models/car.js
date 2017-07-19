'use strict';
module.exports = function(sequelize, DataTypes) {
  var Car = sequelize.define('Car', {
    brand: DataTypes.STRING,
    type: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Car;
};