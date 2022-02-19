'use strict'
const faker = require('faker')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Stones',
      Array.from({ length: 50 }, () => ({
        name: faker.name.findName(),
        address: faker.address.streetAddress(),
        date: '2022/2/19',
        image: `https://loremflickr.com/320/240/restaurant,food/?random=${Math.random() * 100}`,
        description: faker.lorem.text(),
        party: '倒石理事長',
        created_at: new Date(),
        updated_at: new Date()
      }))
    )
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Stones', null, {})
  }
}
