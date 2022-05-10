module.exports = {
  async up (queryInterface, Sequelize) {

    const ps1polygon = {type: 'Polygon', coordinates: [[[100.0, 0.0], [101.0, 0.0], [101.0, 1.0],[100.0, 1.0],[100.0, 0.0]]]};
    const ps2polygon = {type: 'Polygon', coordinates: [[[101.0, 0.0], [102.0, 0.0], [102.0, 1.0],[101.0, 1.0],[101.0, 0.0]]]}
    const ps3polygon = {type: 'Polygon', coordinates: [[[102.0, 0.0], [103.0, 0.0], [103.0, 1.0],[102.0, 1.0],[102.0, 0.0]]]}
    const ps4polygon = {type: 'Polygon', coordinates: [[[103.0, 0.0], [104.0, 0.0], [104.0, 1.0],[103.0, 1.0],[103.0, 0.0]]]}
    const ps5polygon = {type: 'Polygon', coordinates: [[[104.0, 0.0], [105.0, 0.0], [105.0, 1.0],[104.0, 1.0],[104.0, 0.0]]]}
    const ps6polygon = {type: 'Polygon', coordinates: [[[105.0, 0.0], [106.0, 0.0], [106.0, 1.0],[105.0, 1.0],[105.0, 0.0]]]}
    const ps7polygon = {type: 'Polygon', coordinates: [[[106.0, 0.0], [107.0, 0.0], [107.0, 1.0],[105.0, 1.0],[105.0, 0.0]]]}
    const ps8polygon = {type: 'Polygon', coordinates: [[[107.0, 0.0], [108.0, 0.0], [108.0, 1.0],[107.0, 1.0],[107.0, 0.0]]]}
    const ps9polygon = {type: 'Polygon', coordinates: [[[108.0, 0.0], [109.0, 0.0], [109.0, 1.0],[108.0, 1.0],[108.0, 0.0]]]}
    const ps10polygon = {type: 'Polygon', coordinates: [[[109.0, 0.0], [110.0, 0.0], [110.0, 1.0],[109.0, 1.0],[109.0, 0.0]]]}
    const ps11polygon = {type: 'Polygon', coordinates: [[[110.0, 0.0], [111.0, 0.0], [111.0, 1.0],[110.0, 1.0],[110.0, 0.0]]]}
    const ps12polygon = {type: 'Polygon', coordinates: [[[111.0, 0.0], [112.0, 0.0], [112.0, 1.0],[111.0, 1.0],[111.0, 0.0]]]}

    await queryInterface.bulkInsert('ParkingSpaces', 
    [
      {spaceId: 1, zoneId: 7, status: "AVAILABLE", gpsPolygon: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(ps1polygon)), createdAt: new Date(), updatedAt: new Date()},
      {spaceId: 2, zoneId: 7, status: "AVAILABLE", gpsPolygon: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(ps2polygon)), createdAt: new Date(), updatedAt: new Date()},
      {spaceId: 3, zoneId: 8, status: "AVAILABLE", gpsPolygon: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(ps3polygon)), createdAt: new Date(), updatedAt: new Date()},
      {spaceId: 4, zoneId: 8, status: "AVAILABLE", gpsPolygon: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(ps4polygon)), createdAt: new Date(), updatedAt: new Date()},
      {spaceId: 5, zoneId: 9, status: "AVAILABLE", gpsPolygon: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(ps5polygon)), createdAt: new Date(), updatedAt: new Date()},
      {spaceId: 6, zoneId: 9, status: "AVAILABLE", gpsPolygon: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(ps6polygon)), createdAt: new Date(), updatedAt: new Date()},
      {spaceId: 7, zoneId: 10, status: "AVAILABLE", gpsPolygon: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(ps7polygon)), createdAt: new Date(), updatedAt: new Date()},
      {spaceId: 8 ,zoneId: 10, status: "AVAILABLE", gpsPolygon: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(ps8polygon)), createdAt: new Date(), updatedAt: new Date()},
      {spaceId: 9 ,zoneId: 11, status: "AVAILABLE", gpsPolygon: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(ps9polygon)), createdAt: new Date(), updatedAt: new Date()},
      {spaceId: 10 ,zoneId: 11, status: "AVAILABLE", gpsPolygon: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(ps10polygon)), createdAt: new Date(), updatedAt: new Date()},
      {spaceId: 11 ,zoneId: 12, status: "AVAILABLE", gpsPolygon: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(ps11polygon)), createdAt: new Date(), updatedAt: new Date()},
      {spaceId: 12 ,zoneId: 12, status: "AVAILABLE", gpsPolygon: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(ps12polygon)), createdAt: new Date(), updatedAt: new Date()},
    ])
  },


  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ParkingSpaces', null, {});
  }
};
