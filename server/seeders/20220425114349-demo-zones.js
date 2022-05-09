module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Zones', 
    [
      {zoneId: 7, carParkId: 1, name: "General", spaces: 2, createdAt: new Date(), updatedAt: new Date()},
      {zoneId: 8, carParkId: 1, name: "Disabled", spaces: 2, createdAt: new Date(), updatedAt: new Date()},
      {zoneId: 9, carParkId: 2, name: "General", spaces: 2, createdAt: new Date(), updatedAt: new Date()},
      {zoneId: 10, carParkId: 2, name: "Disabled", spaces: 2, createdAt: new Date(), updatedAt: new Date()},
      {zoneId: 11, carParkId: 2, name: "Motorcycles", spaces: 2, createdAt: new Date(), updatedAt: new Date()},
      {zoneId: 12, carParkId: 3, name: "General", spaces: 2, createdAt: new Date(), updatedAt: new Date()},
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Zones', null, {});
  }
};
