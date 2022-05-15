module.exports = {
  async up (queryInterface, Sequelize) {

    const ps1polygon = {type: 'Point', coordinates: [1.241371, 52.623380]};
    const ps2polygon = {type: 'Point', coordinates: [1.241371, 52.623361]}; 
    const ps3polygon = {type: 'Point', coordinates: [1.241373, 52.623341]}; 
    const ps4polygon = {type: 'Point', coordinates: [1.241382, 52.623317]};
    const ps5polygon = {type: 'Point', coordinates: [1.233338, 52.622387]};
    const ps6polygon = {type: 'Point', coordinates: [1.233379, 52.622386]};
    const ps7polygon = {type: 'Point', coordinates: [1.233379, 52.622386]};
    const ps8polygon = {type: 'Point', coordinates: [1.233447, 52.622372]};
    const ps9polygon = {type: 'Point', coordinates: [1.233467, 52.622384]};
    const ps10polygon = {type: 'Point', coordinates: [1.233496, 52.622391]};
    const ps11polygon = {type: 'Point', coordinates: [1.235344, 52.621352]};
    const ps12polygon = {type: 'Point', coordinates: [1.235379, 52.621351]};

    await queryInterface.bulkInsert('ParkingSpaces', 
    [
      {spaceId: 1, carParkId: 1, zoneId: 1, spaceNo: 1, status: "AVAILABLE", gpsPoint: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(ps1polygon)), createdAt: new Date(), updatedAt: new Date()},
      {spaceId: 2, carParkId: 1, zoneId: 1, spaceNo: 2, status: "AVAILABLE", gpsPoint: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(ps2polygon)), createdAt: new Date(), updatedAt: new Date()},
      {spaceId: 3, carParkId: 1, zoneId: 2, spaceNo: 3, status: "AVAILABLE", gpsPoint: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(ps3polygon)), createdAt: new Date(), updatedAt: new Date()},
      {spaceId: 4, carParkId: 1, zoneId: 2, spaceNo: 4, status: "AVAILABLE", gpsPoint: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(ps4polygon)), createdAt: new Date(), updatedAt: new Date()},
      {spaceId: 5, carParkId: 2, zoneId: 3, spaceNo: 1, status: "AVAILABLE", gpsPoint: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(ps5polygon)), createdAt: new Date(), updatedAt: new Date()},
      {spaceId: 6, carParkId: 2, zoneId: 3, spaceNo: 2, status: "AVAILABLE", gpsPoint: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(ps6polygon)), createdAt: new Date(), updatedAt: new Date()},
      {spaceId: 7, carParkId: 3 ,zoneId: 4, spaceNo: 1, status: "AVAILABLE", gpsPoint: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(ps7polygon)), createdAt: new Date(), updatedAt: new Date()},
      {spaceId: 8, carParkId: 3, zoneId: 4, spaceNo: 2, status: "AVAILABLE", gpsPoint: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(ps8polygon)), createdAt: new Date(), updatedAt: new Date()},
      {spaceId: 9, carParkId: 3, zoneId: 5, spaceNo: 3, status: "AVAILABLE", gpsPoint: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(ps9polygon)), createdAt: new Date(), updatedAt: new Date()},
      {spaceId: 10, carParkId: 3, zoneId: 5, spaceNo: 4, status: "AVAILABLE", gpsPoint: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(ps10polygon)), createdAt: new Date(), updatedAt: new Date()},
      {spaceId: 11, carParkId: 3, zoneId: 6, spaceNo: 5, status: "AVAILABLE", gpsPoint: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(ps11polygon)), createdAt: new Date(), updatedAt: new Date()},
      {spaceId: 12, carParkId: 3, zoneId: 6, spaceNo: 6, status: "AVAILABLE", gpsPoint: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(ps12polygon)), createdAt: new Date(), updatedAt: new Date()},
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ParkingSpaces', null, {});
  }
};
