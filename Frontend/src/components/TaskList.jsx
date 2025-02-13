import { useEffect, useState } from "react";
import { getTasks, deleteTask } from "../api/api";
import { toast } from "react-toastify";

const TaskList = ({ setEditingTask }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    toast.warn("Task deleted!");
    fetchTasks();
  };

  return (
    <div className="task-container">
      {tasks.map((task) => (
        <div key={task._id} className={`task-card ${task.completed ? "completed" : ""}`}>
          <div className="task-content">
            <span>{task.title}</span>
          </div>
          <div className="task-actions">
            <button onClick={() => setEditingTask(task)}>Edit</button>
            <button onClick={() => handleDelete(task._id)} className="delete-btn">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
