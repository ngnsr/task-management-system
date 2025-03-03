import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTask, updateTaskStatus } from "../services/tasks"

interface Task {
  _id: string;
  title: string;
  description?: string;
  status: string;
}

const TaskDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getTask(id)
      .then((res) => {
        setTask(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch task:", err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleStatusChange = async (newStatus: string) => {
    if (!task) return;

    try {
      await updateTaskStatus(task._id, newStatus);
      setTask((prev) => (prev ? { ...prev, status: newStatus } : prev));
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!task) return <p>Task not found</p>;

  return (
    <div className="p-4 border rounded-md shadow-md">
      <h2 className="text-xl font-bold">{task.title}</h2>
      <p className="text-gray-600">{task.description || "No description"}</p>
      <div className="mt-4">
        <span className="font-semibold">Status: </span>
        <select
          value={task.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="border p-1 rounded-md"
        >
          <option value="toDo">To Do</option>
          <option value="inProgress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
    </div>
  );
};

export default TaskDetails;
