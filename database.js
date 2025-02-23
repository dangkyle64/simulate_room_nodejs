const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgresql://simulate_room_postgresql_user:MRYgjadY5bCCRLygEe31EVdku1zlW6lo@dpg-cuaok4in91rc738up54g-a.oregon-postgres.render.com/simulate_room_postgresql', {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // For development, but should be true in production
        },
      },
    logging: false,
});

async function syncDatabase() {

    try {
        await sequelize.authenticate();
        //console.log('Connection established successfully');

        await sequelize.sync({ force: false });
        //console.log('Database and tables created.');
    } catch(error) {
        console.error('Unable to connect to the database', error);
    }
};
syncDatabase();
module.exports = sequelize;