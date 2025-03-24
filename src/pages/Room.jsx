import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Peer from "peerjs";
import VideoPlayer from "../components/VideoPlayer";
import ChatBox from "../components/ChatBox";
import Controls from "../components/Controls";

const CreateRoom = () => {
  const [roomId] = useState("ABC123"); // TODO: Replace with dynamic room ID
  const [peerId, setPeerId] = useState(null);
  const [remoteId, setRemoteId] = useState("");
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerInstance = useRef(null);

  useEffect(() => {
    console.log("📡 Initializing PeerJS...");

    const peer = new Peer({
      host: "localhost",  // Change this if using a remote PeerJS server
      port: 9000,
      path: "/",
      debug: 3, // Logs detailed messages
    });

    peerInstance.current = peer;

    peer.on("open", (id) => {
      console.log("✅ My Peer ID:", id);
      setPeerId(id);
    });

    peer.on("call", (call) => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
          call.answer(stream);
          call.on("stream", (remoteStream) => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remoteStream;
            }
          });
        })
        .catch((error) => console.error("🎥 Error accessing media devices:", error));
    });

    peer.on("error", (err) => {
      console.error("🚨 PeerJS Error:", err);
    });

    return () => {
      peer.disconnect();
    };
  }, []);

  const callPeer = () => {
    if (!remoteId) {
      console.warn("⚠️ Enter a valid Peer ID to call.");
      return;
    }
    
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        const call = peerInstance.current.call(remoteId, stream);
        call.on("stream", (remoteStream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
          }
        });
      })
      .catch((error) => console.error("🎥 Error accessing media devices:", error));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-4 text-center text-2xl font-bold bg-gray-800 shadow-lg"
      >
        Watch Together 🎬 <span className="text-blue-400">Room: {roomId}</span>
      </motion.header>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-1">
        {/* Video Player Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:w-3/4 w-full flex justify-center items-center p-4"
        >
          <VideoPlayer />
        </motion.div>

        {/* Chat Box Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/4 w-full border-t md:border-l md:border-t-0 border-gray-700 p-4"
        >
          <ChatBox />
        </motion.div>
      </div>

      {/* Video Call Section */}
      <div className="flex flex-col items-center mt-6">
        <p className="text-sm">Your Peer ID: {peerId || "Connecting..."}</p>
        <input
          type="text"
          placeholder="Enter Peer ID to connect"
          className="mt-4 p-2 text-black"
          value={remoteId}
          onChange={(e) => setRemoteId(e.target.value)}
        />
        <button
          onClick={callPeer}
          className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded"
        >
          Call Peer
        </button>

        <div className="flex gap-4 mt-6">
          <video ref={localVideoRef} autoPlay muted className="w-60 h-40 bg-black"></video>
          <video ref={remoteVideoRef} autoPlay className="w-60 h-40 bg-black"></video>
        </div>
      </div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4 bg-gray-800 flex justify-center shadow-md"
      >
        <Controls />
      </motion.div>
    </div>
  );
};

export default CreateRoom;
