import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import io from "socket.io-client";
import { usePeerConnection } from "../webrtc";
import VideoPlayer from "./VideoPlayer";
import ChatBox from "./ChatBox";
import Controls from "./Controls";

const socket = io("http://localhost:5000"); // Connect to server

export default function Room() {
  const [roomId] = useState(" ");
  const [videoType, setVideoType] = useState("youtube");
  const [videoId, setVideoId] = useState("");
  const videoRef = useRef(null);
  const { sendData, onDataReceived } = usePeerConnection();

  useEffect(() => {
    socket.on("syncVideo", ({ action, time }) => {
      if (videoRef.current) {
        if (action === "play") videoRef.current.play();
        if (action === "pause") videoRef.current.pause();
        videoRef.current.currentTime = time;
      }
    });

    return () => {
      socket.off("syncVideo");
    };
  }, []);

  const handlePlayPause = (action) => {
    const time = videoRef.current.currentTime;
    socket.emit("syncVideo", { action, time });
    sendData({ type: "video-sync", action, time });
  };

  onDataReceived((data) => {
    if (data.type === "youtube-state") {
      document.querySelector("iframe").contentWindow.postMessage(
        `{"event":"command","func":"${data.state === 1 ? "playVideo" : "pauseVideo"}","args":""}`,
        "*"
      );
    }
    if (data.type === "netflix-sync") {
      let video = document.querySelector("video");
      if (video) {
        data.state === "playing" ? video.play() : video.pause();
      }
    }
  });

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-4 text-center text-2xl font-bold bg-gray-800 shadow-lg"
      >
        Watch Together 🎬 <span className="text-blue-400">Room: {roomId}</span>
      </motion.header>

      <div className="flex flex-col md:flex-row flex-1">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:w-3/4 w-full flex flex-col justify-center items-center p-4"
        >
          <select
            onChange={(e) => setVideoType(e.target.value)}
            className="mb-4 p-2 bg-gray-700 text-white rounded"
          >
            <option value="youtube">YouTube</option>
            <option value="netflix">Netflix</option>
          </select>
          {videoType === "youtube" && (
            <input
              type="text"
              placeholder="YouTube Video ID"
              onChange={(e) => setVideoId(e.target.value)}
              className="mb-4 p-2 bg-gray-700 text-white rounded"
            />
          )}
          <VideoPlayer videoType={videoType} videoId={videoId} videoRef={videoRef} onSync={handlePlayPause} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/4 w-full border-t md:border-l md:border-t-0 border-gray-700 p-4"
        >
          <ChatBox socket={socket} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4 bg-gray-800 flex justify-center shadow-md"
      >
        <Controls onPlayPause={handlePlayPause} />
      </motion.div>
    </div>
  );
}