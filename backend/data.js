const dummyTasks = [
  {
    title: "Complete project proposal",
    description:
      "Draft the initial proposal for the client project including timeline, budget, and resource allocation.",
    status: "pending",
    dueDate: new Date("2025-03-15"),
    createdAt: new Date("2025-03-01"),
  },
  {
    title: "Schedule team meeting",
    description:
      "Organize weekly progress review with development team to discuss roadblocks and next steps.",
    status: "completed",
    dueDate: new Date("2025-03-02"),
    createdAt: new Date("2025-02-28"),
  },
  {
    title: "Review design mockups",
    description:
      "Provide feedback on UI/UX design mockups for the dashboard component.",
    status: "in progress",
    dueDate: new Date("2025-03-07"),
    createdAt: new Date("2025-03-02"),
  },
  {
    title: "Fix navigation bug",
    description:
      "Debug and resolve the issue with the sidebar navigation not appearing correctly on mobile devices.",
    status: "pending",
    dueDate: new Date("2025-03-10"),
    createdAt: new Date("2025-03-01"),
  },
  {
    title: "Write API documentation",
    description:
      "Create comprehensive documentation for the new REST API endpoints with examples and schema information.",
    status: "in progress",
    dueDate: new Date("2025-03-20"),
    createdAt: new Date("2025-02-25"),
  },
  {
    title: "User acceptance testing",
    description:
      "Conduct UAT session with stakeholders to validate the new features in the latest sprint.",
    status: "pending",
    dueDate: new Date("2025-03-25"),
    createdAt: new Date("2025-03-02"),
  },
  {
    title: "Deploy to staging environment",
    description:
      "Prepare and execute deployment of current release to the staging environment for testing.",
    status: "pending",
    dueDate: new Date("2025-03-12"),
    createdAt: new Date("2025-03-01"),
  },
  {
    title: "Optimize database queries",
    description:
      "Review and improve the performance of database queries for the reporting module.",
    status: "completed",
    dueDate: new Date("2025-03-05"),
    createdAt: new Date("2025-02-20"),
  },
  {
    title: "Update dependencies",
    description:
      "Update project dependencies to the latest stable versions to address security vulnerabilities.",
    status: "completed",
    dueDate: new Date("2025-02-28"),
    createdAt: new Date("2025-02-15"),
  },
  {
    title: "Prepare client presentation",
    description:
      "Create slides and talking points for the monthly client progress review meeting.",
    status: "in progress",
    dueDate: new Date("2025-03-18"),
    createdAt: new Date("2025-03-03"),
  },
];

module.exports = dummyTasks;
