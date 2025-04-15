const { User, Building, Task } = require('../models');

async function seedInitialData() {
    try {
        // Create Users
        const users = await User.bulkCreate([
            {
                id: '1',
                name: 'John Doe',
                email: 'john@example.com',
            },
            {
                id: '2',
                name: 'Jane Smith',
                email: 'jane@example.com',
            },
            {
                id: '3',
                name: 'Mike Johnson',
                email: 'mike@example.com',
            },
            {
                id: '4',
                name: 'Sarah Wilson',
                email: 'sarah@example.com',
            }
        ]);

        // Create Buildings
        const buildings = await Building.bulkCreate([
            {
                name: 'Main Office',
                address: '123 Main St, City',
            },
            {
                name: 'North Branch',
                address: '456 North Ave, City',
            },
            {
                name: 'South Branch',
                address: '789 South St, City',
            },
            {
                name: 'East Branch',
                address: '321 East Rd, City',
            }
        ]);

        // Create Tasks
        await Task.bulkCreate([
            {
                title: 'Monthly Report',
                userId: '1',
                status: 'To Do',
                dueDate: new Date('2025-03-25'),
                buildingId: 1
            },
            {
                title: 'Equipment Maintenance',
                userId: '2',
                status: 'In Progress',
                dueDate: new Date('2025-03-20'),
                buildingId: 2
            },
            {
                title: 'Staff Training',
                userId: '3',
                status: 'To Do',
                dueDate: new Date('2025-03-22'),
                buildingId: 3
            },
            {
                title: 'Inventory Check',
                userId: '4',
                status: 'Complete',
                dueDate: new Date('2025-03-18'),
                buildingId: 4
            },
            {
                title: 'Security Audit',
                userId: '1',
                status: 'In Progress',
                dueDate: new Date('2025-03-21'),
                buildingId: 2
            }
        ]);

        console.log('Initial data seeded successfully!');
    } catch (error) {
        console.error('Error seeding initial data:', error);
    }
}

module.exports = seedInitialData; 