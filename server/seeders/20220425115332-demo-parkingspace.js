module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ParkingSpaces', 
    [
      {zoneId: 1, status: "Available", gpsPolygon: [[[100.0, 0.0], [101.0, 0.0], [101.0, 1.0],[100.0, 1.0],[100.0, 0.0]]]},
      {zoneId: 1, status: "Available", gpsPolygon: [[[101.0, 0.0], [102.0, 0.0], [102.0, 1.0],[101.0, 1.0],[101.0, 0.0]]]},
      {zoneId: 2, status: "Available", gpsPolygon: [[[102.0, 0.0], [103.0, 0.0], [103.0, 1.0],[102.0, 1.0],[102.0, 0.0]]]},
      {zoneId: 2, status: "Available", gpsPolygon: [[[103.0, 0.0], [104.0, 0.0], [104.0, 1.0],[103.0, 1.0],[103.0, 0.0]]]},
      {zoneId: 3, status: "Available", gpsPolygon: [[[104.0, 0.0], [105.0, 0.0], [105.0, 1.0],[104.0, 1.0],[104.0, 0.0]]]},
      {zoneId: 3, status: "Available", gpsPolygon: [[[105.0, 0.0], [106.0, 0.0], [106.0, 1.0],[105.0, 1.0],[105.0, 0.0]]]},
      {zoneId: 4, status: "Available", gpsPolygon: [[[106.0, 0.0], [107.0, 0.0], [107.0, 1.0],[105.0, 1.0],[105.0, 0.0]]]},
      {zoneId: 4, status: "Available", gpsPolygon: [[[107.0, 0.0], [108.0, 0.0], [108.0, 1.0],[107.0, 1.0],[107.0, 0.0]]]},
      {zoneId: 5, status: "Available", gpsPolygon: [[[108.0, 0.0], [109.0, 0.0], [109.0, 1.0],[108.0, 1.0],[108.0, 0.0]]]},
      {zoneId: 5, status: "Available", gpsPolygon: [[[109.0, 0.0], [110.0, 0.0], [110.0, 1.0],[109.0, 1.0],[109.0, 0.0]]]},
      {zoneId: 6, status: "Available", gpsPolygon: [[[110.0, 0.0], [111.0, 0.0], [111.0, 1.0],[110.0, 1.0],[110.0, 0.0]]]},
      {zoneId: 6, status: "Available", gpsPolygon: [[[111.0, 0.0], [112.0, 0.0], [112.0, 1.0],[111.0, 1.0],[111.0, 0.0]]]},
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ParkingSpaces', null, {});
  }
};
