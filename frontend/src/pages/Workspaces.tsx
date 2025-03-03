import { useEffect, useState } from "react";
import axios from "axios";

interface Board {
  _id: string;
  title: string;
  description?: string;
}

const Workspace = ({ workspaceId }: { workspaceId?: string }) => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [newBoardDescription, setNewBoardDescription] = useState("");

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const res = await axios.get(`/api/workspaces/${workspaceId}`);
      console.log(res);
      setBoards(res.data.boards);
    } catch (error) {
      console.error("Error fetching boards:", error);
    }
  };

  const handleCreateBoard = async () => {
    if (!newBoardTitle.trim()) return;

    try {
      const res = await axios.post(`/api/workspaces/${workspaceId}/boards`, {
        title: newBoardTitle,
        description: newBoardDescription,
      });
      setBoards([...boards, res.data]); // Додаємо новий борд у список
      setNewBoardTitle("");
      setNewBoardDescription("");
    } catch (error) {
      console.error("Error creating board:", error);
    }
  };

  return (
    <div>
      <h2>Boards</h2>
      <ul>
        {boards.map((board) => (
          <li key={board._id}>{board.title} - {board.description}</li>
        ))}
      </ul>

      <h3>Create New Board</h3>
      <input
        type="text"
        placeholder="Board title"
        value={newBoardTitle}
        onChange={(e) => setNewBoardTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Board description"
        value={newBoardDescription}
        onChange={(e) => setNewBoardDescription(e.target.value)}
      />
      <button onClick={handleCreateBoard}>Create Board</button>
    </div>
  );
};

export default Workspace;
