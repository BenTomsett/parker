module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Zones', 
    [
      {zoneId: 1, carParkId: 1, name: "General", spaces: 2, createdAt: new Date(), updatedAt: new Date()},
      {zoneId: 2, carParkId: 1, name: "Disabled", spaces: 2, createdAt: new Date(), updatedAt: new Date()},
      {zoneId: 3, carParkId: 2, name: "General", spaces: 2, createdAt: new Date(), updatedAt: new Date()},
      {zoneId: 4, carParkId: 3, name: "Disabled", spaces: 2, createdAt: new Date(), updatedAt: new Date()},
      {zoneId: 5, carParkId: 3, name: "Motorcycles", spaces: 2, createdAt: new Date(), updatedAt: new Date()},
      {zoneId: 6, carParkId: 3, name: "General", spaces: 2, createdAt: new Date(), updatedAt: new Date()},
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Zones', null, {});
  }
};
