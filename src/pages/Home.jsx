import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const navigate = useNavigate();

  const createRoom = () => {
    const roomId = uuidv4(); // Generate a unique room ID
    navigate(`/room/${roomId}`); // Redirect to the Room page
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold">Welcome to Watch Together</h1>
      <p className="mt-4 text-lg">Enjoy watching videos with your friends in sync!</p>
      <button
        onClick={createRoom}
        className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
      >
        Create a Room
      </button>
    </div>
  );
}
