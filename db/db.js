const Sequelize = require('sequelize');

const sequelize = new Sequelize('course_registration', 'root', 'pista', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
   .then(() => console.log('Connected to course_registration database'))
   .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;