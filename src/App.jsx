import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useEffect } from "react";
import peer from "./utils/peer"; // Import PeerJS instance
import Home from "./pages/Home";
import Room from "./pages/Room";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";

function App() {
    useEffect(() => {
        peer.on("open", (id) => {
            console.log("My Peer ID:", id);
        });
    }, []);

    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Room/:id" element={<Room />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
