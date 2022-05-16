module.exports = {
    async up (queryInterface, Sequelize) {
  
      const b1Point = {type: 'Point', coordinates: [1.2411271595619968, 52.62394859140857]};
      const b2Point = {type: 'Point', coordinates: [1.23740425043097, 52.620991650507634]};
      const b3Point = {type: 'Point', coordinates: [1.2354569648212386, 52.62154201930092]}; 
  
      await queryInterface.bulkInsert('Buildings', 
      [
        {name: "Sportspark", gpsPoint: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(b1Point)), createdAt: new Date(), updatedAt: new Date()},
        {name: "School of Computing Science", gpsPoint: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(b2Point)), createdAt: new Date(), updatedAt: new Date()},
        {name: "Elizabeth Fry Building", gpsPoint: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(b3Point)), createdAt: new Date(), updatedAt: new Date()},
      ])
    },
  
    async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('CarParks', null, {});
    }
  };
