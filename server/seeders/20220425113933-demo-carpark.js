module.exports = {
  async up (queryInterface, Sequelize) {

    const cp1Point = {type: 'Point', coordinates: [1.242931, 52.623311]};
    const cp2Point = {type: 'Point', coordinates: [1.232728, 52.622202]};
    const cp3Point = {type: 'Point', coordinates: [1.235463, 52.621316]};

    await queryInterface.bulkInsert('CarParks', 
    [
      {name: "Main Car Park", numOfSpaces: 4, gpsPoint: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(cp1Point)), createdAt: new Date(), updatedAt: new Date()},
      {name: "New Science Car Park", numOfSpaces: 6, gpsPoint: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(cp2Point)), createdAt: new Date(), updatedAt: new Date()},
      {name: "Constable Terrace Car Park", numOfSpaces: 2, gpsPoint: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(cp3Point)), createdAt: new Date(), updatedAt: new Date()}
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CarParks', null, {});
  }
};
