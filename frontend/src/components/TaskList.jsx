import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const apiUrl = "http://localhost:5000/api/tasks";

  // Fetch all tasks
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        statusFilter !== "all" ? `${apiUrl}?status=${statusFilter}` : apiUrl
      );
      setTasks(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Failed to load tasks. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchTasks();
  }, [statusFilter]);

  // Handle task deletion
  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await axios.delete(`${apiUrl}/${taskId}`);
        setTasks(tasks.filter((task) => task._id !== taskId));
      } catch (error) {
        console.error("Error deleting task:", error);
        alert("Failed to delete task. Please try again.");
      }
    }
  };

  // Handle editing a task
  const handleEditTask = (task) => {
    setCurrentTask(task);
    setShowForm(true);
  };

  // Handle form submission (create or update)
  const handleTaskSubmit = (task) => {
    if (currentTask && currentTask._id) {
      // Update existing task in the list
      setTasks(tasks.map((t) => (t._id === task._id ? task : t)));
    } else {
      // Add new task to the list
      setTasks([task, ...tasks]);
    }

    // Close the form and reset current task
    setShowForm(false);
    setCurrentTask(null);
  };

  // Cancel form
  const handleCancelForm = () => {
    setShowForm(false);
    setCurrentTask(null);
  };

  // Handle status filter change
  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Task Manager</h1>

        <div className="flex space-x-2">
          <select
            value={statusFilter}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <button
            onClick={() => {
              setCurrentTask(null);
              setShowForm(!showForm);
            }}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            {showForm && !currentTask ? "Cancel" : "Add Task"}
          </button>
        </div>
      </div>

      {/* Task Form */}
      {showForm && (
        <div className="mb-6">
          <TaskForm
            task={currentTask}
            onTaskSubmit={handleTaskSubmit}
            onCancel={handleCancelForm}
          />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>
      )}

      {/* Loading Indicator */}
      {loading ? (
        <div className="text-center py-10">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading tasks...</p>
        </div>
      ) : (
        <div>
          {/* Empty State */}
          {tasks.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <p className="text-gray-500">
                No tasks found. Create your first task!
              </p>
            </div>
          ) : (
            /* Task List */
            <div className="space-y-4">
              {tasks.map((task) => (
                <TaskItem
                  key={task._id}
                  task={task}
                  onDelete={handleDeleteTask}
                  onEdit={handleEditTask}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskList;
