module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('CarParks', 
    [
      {name: "Main Car Park", zones: [1,2]},
      {name: "New Science Car Park", zones: [3,4,5]},
      {name: "Constable Terrace Car Park", zones: [6]}
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CarParks', null, {});
  }
};
