const sequelize = require('./config/database');
const Task = require('./models/taskModel');

async function syncDatabase() {
    try {
        await sequelize.sync({ force: true }); // force: true drops tables if they already exist
        console.log('Database synced');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
}

syncDatabase();