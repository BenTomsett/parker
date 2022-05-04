module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Zones', 
    [
      {carparkId: 1, name: "General", spaces: 2},
      {carparkId: 1, name: "Disabled", spaces: 2}, 
      {carparkId: 2, name: "General", spaces: 2},
      {carparkId: 2, name: "Disabled", spaces: 2},
      {carparkId: 2, name: "Motorcycles", spaces: 2}, 
      {carparkId: 3, name: "General", spaces: 2},
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Zones', null, {});
  }
};
