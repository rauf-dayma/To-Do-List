import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { ToastContainer } from "react-toastify";
import "./styles.css";

const App = () => {
  const [editingTask, setEditingTask] = useState(null);

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <TaskForm 
        onTaskAdded={() => window.location.reload()} 
        editingTask={editingTask}
        clearEditingTask={() => setEditingTask(null)}
      />
      <TaskList setEditingTask={setEditingTask} />
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default App;
