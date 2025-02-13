import Task from "../models/task.js";

// Get all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Add a new task
export const addTask = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    const newTask = new Task({ title });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    
    if (title !== undefined) task.title = title;
    if (completed !== undefined) task.completed = completed;
    
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
