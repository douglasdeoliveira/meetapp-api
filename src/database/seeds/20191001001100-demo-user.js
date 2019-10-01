module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Douglas de Oliveira',
          email: 'douglas@demo.com',
          password_hash:
            '$2a$08$UW6QqBEKqFtyb7sCPH/evumJ4WyqOzPUOlfe8DtEICudNg.D82XRe',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
