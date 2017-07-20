'use strict';
module.exports = function (sequelize, DataTypes) {
  var Bridge = sequelize.define('Bridge', {
    UserId: DataTypes.INTEGER,
    CarId: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    uangMuka: DataTypes.INTEGER,
    cicilan: DataTypes.INTEGER,
    sisaBulan: DataTypes.INTEGER,
    hutang: DataTypes.INTEGER
  })
  Bridge.associate = (models) => {
    Bridge.belongsTo(models.User)
    Bridge.belongsTo(models.Car)
  };
  return Bridge;
};
