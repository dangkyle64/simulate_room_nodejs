const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite3',
    logging: false,
});

async function syncDatabase() {

    try {
        await sequelize.authenticate();
        console.log('Connection established successfully');

        await sequelize.sync({ force: true });
        console.log('Database and tables created.');
    } catch(error) {
        console.error('Unable to connect to the database', error);
    }
};
syncDatabase();
module.exports = sequelize;