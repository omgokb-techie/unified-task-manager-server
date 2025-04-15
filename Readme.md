# Task Management Backend Service

A RESTful API service for managing tasks, users, and buildings with proper relationships and timestamps.

## Features

- Task management with status tracking
- User management with role-based access
- Building management with manager assignments
- Automatic timestamp tracking (createdAt, updatedAt)
- RESTful API endpoints
- CORS enabled for frontend integration
- Database relationships and constraints

## API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks or filter by building/user
- `POST /api/tasks` - Create a new task
- `PATCH /api/tasks/:id/status` - Update task status

### Users
- `GET /api/users` - Get all users

### Buildings
- `GET /api/buildings` - Get all buildings

## Data Models

### Task
```javascript
{
    id: INTEGER,
    title: STRING,
    userId: INTEGER,
    status: ENUM('To Do', 'In Progress', 'Complete'),
    dueDate: DATE,
    buildingId: INTEGER,
    createdAt: DATE,
    updatedAt: DATE
}
```

### User
```javascript
{
    id: INTEGER,
    name: STRING,
    email: STRING,
    role: ENUM('admin', 'manager', 'staff'),
    createdAt: DATE,
    updatedAt: DATE
}
```

### Building
```javascript
{
    id: INTEGER,
    name: STRING,
    address: STRING,
    createdAt: DATE,
    updatedAt: DATE
}
```

## Relationships

- User has many Tasks (one-to-many)
- Building has many Tasks (one-to-many)
- Task belongs to User (many-to-one)
- Task belongs to Building (many-to-one)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure database:
- Create a `.env` file with your database configuration
- Update `config/database.js` if needed

3. Run the seeder (optional):
```bash
node seed.js
```

4. Start the server:
```bash
node index.js
```

## Environment Variables

Create a `.env` file with:
```
DB_HOST=your_host
DB_USER=your_user
DB_PASS=your_password
DB_NAME=your_database
PORT=5000
```

## Dependencies

- express
- sequelize
- cors
- socket.io
- node-cron

## Development

The service includes:
- Automatic timestamp tracking
- Proper error handling
- CORS configuration
- Database relationships
- Initial data seeding capability

## Integration Concepts

### Email Integration
The system can be extended to automatically create tasks from incoming emails through:
1. **Email Parser Service**
   - Dedicated service listening to a specific email inbox
   - Parses email content for task details (title, due date, assignee)
   - Uses email metadata for building/user context
   - Creates tasks via API endpoints
   - Example: `support@company.com` → Task for Support Team

2. **Email Templates**
   - Standardized email formats for task creation
   - Subject line: `[TASK] Title - Due Date`
   - Body: Task description and metadata
   - CC/BCC for task assignment and building context

### API Integration
External systems can integrate with the task management system through:

1. **Webhook Endpoints**
   - `/api/webhooks/tasks` - Receive task creation/updates
   - Authentication via API keys
   - Payload validation and processing
   - Example: CRM system → Task for Sales Team

2. **Integration Points**
   - Calendar systems for due date synchronization
   - Project management tools for task status updates
   - Notification systems for task alerts
   - Analytics platforms for task metrics

3. **Authentication & Security**
   - API key management
   - Rate limiting
   - IP whitelisting
   - Payload encryption

### Implementation Considerations
- Queue system for handling high volume
- Error handling and retry mechanisms
- Logging and monitoring
- Data validation and sanitization
- Rate limiting and throttling
- Backup and recovery procedures