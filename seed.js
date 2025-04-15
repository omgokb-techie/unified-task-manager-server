const sequelize = require('./config/database');
const seedInitialData = require('./seeders/initialData');

async function runSeeder() {
    try {
        // Connect to database
        await sequelize.authenticate();
        console.log('Database connected');

        // Sync all models (this will drop and recreate tables)
        await sequelize.sync({ force: true });
        console.log('Database synced');

        // Seed initial data
        await seedInitialData();
        console.log('Initial data seeded successfully!');

        // Close the database connection
        await sequelize.close();
        console.log('Database connection closed');
    } catch (error) {
        console.error('Error:', error);
    }
}

// Run the seeder
runSeeder(); 