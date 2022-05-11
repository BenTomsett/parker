module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bookings',
        [
            {bookingId: 1, bookingType: 'USER', startDate: new Date(), endDate: new Date(Date.now() + 24 * 60 * 60 * 1000), checkedIn: true, checkedOut: false, createdAt: new Date(), updatedAt: new Date(), userId: 1, spaceId: 1 },
            {bookingId: 2, bookingType: 'USER', startDate: new Date(), endDate: new Date(Date.now() + 18 * 58 * 32 * 108), checkedIn: false, checkedOut: false, createdAt: new Date(), updatedAt: new Date(), userId: 1, spaceId: 2 },
            {bookingId: 3, bookingType: 'USER', startDate: new Date(), endDate: new Date(Date.now() + 12 * 33 * 21 * 65), checkedIn: false, checkedOut: false, createdAt: new Date(), updatedAt: new Date(), userId: 1, spaceId: 3 }
        ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', null, {});
  }
};