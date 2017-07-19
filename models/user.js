'use strict';

var randomSecret = require('../helpers/randomSecret')
var hash = require('../helpers/hash')


module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    address: DataTypes.TEXT,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    secret: DataTypes.STRING
  },
  {
    hooks: {
      beforeCreate: (models) => {
        let secret = randomSecret();
        let password = models.password;
        models.secret = secret;
        models.password = hash(secret, password);
      }
    }
  })
  User.associate = (models) => {
    User.belongsToMany(models.Car, {
      through: `Bridge`,
      foreignKey: `UserId`
    })
  };
  return User;
};
