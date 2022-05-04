module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', 
    [
      {forename: "Nathan", surname: "Sebhastian", dob: '2002-04-29', email:'testemail1@example.com', password: 'Kakjfaij!84', addressLine1: 'Test AddressL1 1', addressLine2: 'Test AddressL2 1', city: 'Norwich', postcode: 'NR7 8LY', country: 'United Kingdom', createdAt: new Date(), updatedAt: new Date()},
      {forename: "Jack", surname: "Stark", dob: '1997-11-07', email:'testemail2@example.com', password: 'jdajDjad8!', addressLine1: 'Test AddressL1 2', addressLine2: 'Test AddressL2 2', city: 'Leeds', postcode: 'LS3 EUY', country: 'United Kindgom', createdAt: new Date(), updatedAt: new Date()},
      {forename: "John", surname: "Snow", dob: '1958-06-15', email:'testemail3@example.com', password: 'Geoff123!', addressLine1: 'Test AddressL1 3', addressLine2: 'Test AddressL2 3', city: 'London', postcode: 'E1 E81', country: 'United Kindgom', createdAt: new Date(), updatedAt: new Date()}
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
