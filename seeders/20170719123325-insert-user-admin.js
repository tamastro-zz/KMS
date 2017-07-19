'use strict';

var hash = require('../helpers/hash')
var randomSecret = require('../helpers/randomSecret')

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    var secret = randomSecret()
    return queryInterface.bulkInsert('Users', [{
      name: 'admin',
      address: 'home',
      phone: '000',
      email: 'admin@mail.com',
      role: 'administrator',
      createdAt: new Date(),
      updatedAt: new Date(),
      username: 'admin',
      password: hash(secret, 'admin'),
      secret: secret
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
