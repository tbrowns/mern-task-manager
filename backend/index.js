// Required dependencies
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./db");
const Task = require("./models/Task");

// Call the connect function
connectDB();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes

// Create a new task
app.post("/api/tasks", async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;

    const newTask = new Task({
      title,
      description,
      status,
      dueDate,
    });

    const task = await newTask.save();
    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error.message);

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: "Server Error" });
  }
});

// Get all tasks
app.get("/api/tasks", async (req, res) => {
  try {
    // Add query parameters for filtering (optional feature)
    const { status } = req.query;

    const filter = {};
    if (status) {
      filter.status = status;
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get a single task by ID
app.get("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.error("Error fetching task:", error.message);

    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(500).json({ message: "Server Error" });
  }
});

// Update a task by ID
app.put("/api/tasks/:id", async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;

    // Build task object
    const taskFields = {};
    if (title !== undefined) taskFields.title = title;
    if (description !== undefined) taskFields.description = description;
    if (status !== undefined) taskFields.status = status;
    if (dueDate !== undefined) taskFields.dueDate = dueDate;

    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Update and return the new task
    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: taskFields },
      { new: true }
    );

    res.json(task);
  } catch (error) {
    console.error("Error updating task:", error.message);

    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Task not found" });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: "Server Error" });
  }
});

// Delete a task by ID
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await Task.findByIdAndRemove(req.params.id);

    res.json({ message: "Task removed" });
  } catch (error) {
    console.error("Error deleting task:", error.message);

    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(500).json({ message: "Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
