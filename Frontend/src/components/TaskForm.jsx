import { useState, useEffect } from "react";
import { addTask, updateTask } from "../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskForm = ({ onTaskAdded, editingTask, clearEditingTask }) => {
  const [title, setTitle] = useState("");

  // When editing a task, update the input field
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Task title cannot be empty!");
      return;
    }

    if (editingTask) {
      // Update existing task
      await updateTask(editingTask._id, { ...editingTask, title });
      toast.success("Task updated successfully!");
      clearEditingTask(); // Reset editing state
    } else {
      // Add new task
      await addTask({ title });
      toast.success("Task added successfully!");
    }

    setTitle("");
    onTaskAdded(); // Refresh tasks list
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Enter task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">{editingTask ? "Update Task" : "Add Task"}</button>
      {editingTask && (
        <button type="button" className="cancel-btn" onClick={clearEditingTask}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default TaskForm;
