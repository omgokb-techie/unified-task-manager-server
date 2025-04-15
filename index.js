const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cron = require('node-cron');
const { Op } = require('sequelize');
const { Task, User } = require('./models');
const bodyParser = require('body-parser');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const buildingRoutes = require('./routes/buildingRoutes');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./config/database');

// Connect to database
sequelize.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Database connection error:', err));

const app = express();

// CORS configuration - allow all origins
app.use(cors({ origin: '*' }));

app.use(bodyParser.json());

// API Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/buildings', buildingRoutes);
app.use('/api/users', userRoutes);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // allow frontend origin in production
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);
});

(function startReminderJob() {
    cron.schedule('* * * * *', async () => { // Run every minute
        const currentDate = new Date();

        // Find tasks that are overdue
        const overdueTasks = await Task.findAll({
            where: {
                dueDate: { [Op.lt]: currentDate },
                status: { [Op.ne]: 'Complete' }
            }
        });

        // Send reminder for overdue tasks (you can replace this with actual email logic)
        if (overdueTasks.length > 0) {
            io.emit("task:overdue", overdueTasks);
        }

        // Find tasks due within 24 hours
        const upcomingTasks = await Task.findAll({
            where: {
                dueDate: { [Op.lte]: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000) },
                status: { [Op.ne]: 'Complete' }
            }
        });

        // Send reminder for tasks due in the next 24 hours
        if (upcomingTasks.length > 0) {
            io.emit("task:upcoming", upcomingTasks);
        }
    });
})();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

