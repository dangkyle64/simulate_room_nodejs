const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgresql://simulate_room_postgresql2_user:IpKFh8TotecjwNSezQl0ql8IvVYwLiJK@dpg-cuv05m9u0jms739viq20-a.oregon-postgres.render.com/simulate_room_postgresql2', {
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