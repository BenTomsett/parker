module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('CarParks', 
    [
      {name: "Main Car Park", zones: [1,2], numOfSpaces: 4, createdAt: new Date(), updatedAt: new Date()},
      {name: "New Science Car Park", zones: [3,4,5], numOfSpaces: 6, createdAt: new Date(), updatedAt: new Date()},
      {name: "Constable Terrace Car Park", zones: [6], numOfSpaces: 2, createdAt: new Date(), updatedAt: new Date()}
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CarParks', null, {});
  }
};
