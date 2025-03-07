[Live Demo](https://mern-task-manager-red.vercel.app/)

# Task Manager Application Documentation

## Overview

The Task Manager is a full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js). It allows users to create, read, update, and delete tasks, providing a complete task management solution with an intuitive user interface.

## Table of Contents

- [Architecture](#architecture)
- [Backend API](#backend-api)
- [Frontend Components](#frontend-components)
- [Database Schema](#database-schema)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Common Issues and Troubleshooting](#common-issues-and-troubleshooting)

## Architecture

The application follows a client-server architecture:

- **Backend**: Node.js with Express framework, connected to MongoDB
- **Frontend**: React with Vite, using Axios for API communication
- **Database**: MongoDB for storing task data
- **Styling**: Tailwind CSS for responsive design

## Backend API

The backend provides a RESTful API for task management with the following endpoints:
| Success message |

## Frontend Components

The frontend is organized into the following key components:

### Component Structure

- **App**: The main container component
- **TaskList**: Manages the display of tasks and contains the state management logic
- **TaskForm**: Handles both creating new tasks and editing existing ones
- **TaskItem**: Renders individual task cards with actions

### Features

- Task filtering by status (pending, in progress, completed)
- Form validation for required fields
- Responsive design for mobile and desktop
- Visual indicators for task status
- Confirmation dialogs for destructive actions
- Loading states and error handling

## Database Schema

### Task Schema

```javascript
{
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'in progress', 'completed'],
    default: 'pending'
  },
  dueDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

## Installation

### Backend Setup

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd task-manager
   ```

2. Install dependencies

   ```bash
   cd backend
   npm install
   ```

3. Create a `.env` file with the following variables:

   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/taskmanager
   ```

4. Start the server
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory

   ```bash
   cd ../frontend
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

## Configuration

### Environment Variables

#### Backend

- `PORT`: The port on which the server will run (default: 5000)
- `MONGODB_URI`: Connection string for MongoDB

#### Frontend

- Configured in `src/api/axios.js` - update `API_URL` if your backend runs on a different port

### Database Seeding

You can seed the database with sample tasks using the provided script:

```bash
node seed.js
```

## Usage

### Creating a Task

1. Click the "Add Task" button
2. Fill in the required fields (Title is mandatory)
3. Select a status
4. Choose a due date (optional)
5. Click "Create Task"

### Updating a Task

1. Click the "Edit" button on any task
2. Modify the fields as needed
3. Click "Update Task"

### Filtering Tasks

Use the dropdown menu to filter tasks by status:

- All Tasks
- Pending
- In Progress
- Completed

### Deleting a Task

1. Click the "Delete" button on any task
2. Confirm the deletion in the dialog

## API Reference

### Get All Tasks

```
GET /api/tasks
```

Query Parameters:

- `status` (optional): Filter by status ('pending', 'in progress', 'completed')

Response:

```json
[
  {
    "_id": "60d21b4667d0d8992e610c85",
    "title": "Complete project proposal",
    "description": "Draft the proposal document",
    "status": "pending",
    "dueDate": "2025-03-15T00:00:00.000Z",
    "createdAt": "2025-03-01T12:00:00.000Z"
  },
  ...
]
```

### Get Task by ID

```
GET /api/tasks/:id
```

Response:

```json
{
  "_id": "60d21b4667d0d8992e610c85",
  "title": "Complete project proposal",
  "description": "Draft the proposal document",
  "status": "pending",
  "dueDate": "2025-03-15T00:00:00.000Z",
  "createdAt": "2025-03-01T12:00:00.000Z"
}
```

### Create Task

```
POST /api/tasks
```

Request Body:

```json
{
  "title": "New task",
  "description": "Task description",
  "status": "pending",
  "dueDate": "2025-03-15T00:00:00.000Z"
}
```

Response: The created task object

### Update Task

```
PUT /api/tasks/:id
```

Request Body (include only fields to update):

```json
{
  "status": "in progress"
}
```

Response: The updated task object

### Delete Task

```
DELETE /api/tasks/:id
```

Response:

```json
{
  "message": "Task removed"
}
```

## Common Issues and Troubleshooting

### Backend Connection Issues

- Ensure MongoDB is running and accessible
- Check that the MONGODB_URI in .env is correct
- Verify that the server is running on the expected port

### Frontend API Calls Failing

- Confirm the backend server is running
- Check that the API_URL in axios.js matches your backend URL
- Inspect browser console for specific error messages

### Tasks Not Displaying

- Verify that the database contains tasks (use MongoDB Compass)
- Check network requests in browser developer tools
- Ensure the GET request to /api/tasks is successful

### Form Submission Errors

- Check that all required fields are completed
- Verify network requests for error responses
- Ensure the server is correctly validating input data
