'use strict';
module.exports = function(sequelize, DataTypes) {
  var Bridge = sequelize.define('Bridge', {
    userId: DataTypes.INTEGER,
    carId: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    uangMuka: DataTypes.INTEGER,
    cicilan: DataTypes.INTEGER,
    sisaBulan: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Bridge;
};