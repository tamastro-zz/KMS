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
  }, {
    hooks: {
      beforeCreate: function (models) {
        if (models.hutang <= 500) {
          models.hutang = 0
          models.status = true
        }
      }
    }
  })
  Bridge.associate = (models) => {
    Bridge.belongsTo(models.User)
    Bridge.belongsTo(models.Car)
  };
  return Bridge;
};
