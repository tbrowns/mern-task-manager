import React from "react";
// import axios from "axios";

const TaskItem = ({ task, onDelete, onEdit }) => {
  const { _id, title, description, status, dueDate } = task;

  // Format the date for display
  const formattedDate = dueDate
    ? new Date(dueDate).toLocaleDateString()
    : "No due date";

  // Get appropriate badge color based on status
  const getStatusBadgeClass = () => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in progress":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="border rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow bg-white">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass()}`}
        >
          {status}
        </span>
      </div>

      <p className="text-gray-600 mt-2">{description || "No description"}</p>

      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-500">Due: {formattedDate}</span>

        <div className="space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(_id)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
