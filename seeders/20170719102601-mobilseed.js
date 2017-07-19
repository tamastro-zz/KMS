'use strict';

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
    return queryInterface.bulkInsert('Cars', [{
      brand: 'BMW',
      type: 'M5',
      price: 1500,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      brand: 'Mercedes Benz',
      type: 'SLK',
      price: 1600,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      brand: 'Tesla',
      type: 'Model S',
      price: 2000,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      brand: 'Ford',
      type: 'Mustang',
      price: 1400,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
