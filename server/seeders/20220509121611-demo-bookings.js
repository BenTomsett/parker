module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bookings',
        [
            {bookingId: 1, bookingType: 'USER', startDate: new Date(), endDate: new Date(Date.now() + 24 * 60 * 60 * 1000), checkedIn: true, checkedOut: false, createdAt: new Date(), updatedAt: new Date(), userId: 1, spaceId: `1`}
        ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', null, {});
  }
};