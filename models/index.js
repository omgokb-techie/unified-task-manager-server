const Task = require('./taskModel');
const User = require('./userModel');
const Building = require('./buildingModel');

// User-Task relationship
User.hasMany(Task, {
    foreignKey: 'userId',
    as: 'tasks'
});
Task.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});

// Building-Task relationship
Building.hasMany(Task, {
    foreignKey: 'buildingId',
    as: 'tasks'
});
Task.belongsTo(Building, {
    foreignKey: 'buildingId',
    as: 'building'
});

module.exports = {
    Task,
    User,
    Building
};
