module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Zones', 
    [
      {carParkId: 1, name: "General", spaces: 2, createdAt: new Date(), updatedAt: new Date()},
      {carParkId: 1, name: "Disabled", spaces: 2, createdAt: new Date(), updatedAt: new Date()},
      {carParkId: 2, name: "General", spaces: 2, createdAt: new Date(), updatedAt: new Date()},
      {carParkId: 2, name: "Disabled", spaces: 2, createdAt: new Date(), updatedAt: new Date()},
      {carParkId: 2, name: "Motorcycles", spaces: 2, createdAt: new Date(), updatedAt: new Date()},
      {carParkId: 3, name: "General", spaces: 2, createdAt: new Date(), updatedAt: new Date()},
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Zones', null, {});
  }
};
