import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import YouTube from "react-youtube";
import Peer from "peerjs";

export default function VideoPlayer({ videoType, videoId, isHost, peerId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [player, setPlayer] = useState(null);
  const [peer, setPeer] = useState(null);
  const [connections, setConnections] = useState([]);
  const videoRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Initialize PeerJS
  useEffect(() => {
    const newPeer = new Peer(peerId);
    setPeer(newPeer);

    newPeer.on("connection", (conn) => {
      setConnections((prev) => [...prev, conn]);
      conn.on("data", (data) => handleSyncData(data));
    });

    return () => newPeer.destroy();
  }, [peerId]);

  // Handle received sync data
  const handleSyncData = (data) => {
    if (!isHost && player) {
      if (data.type === "play") player.playVideo();
      if (data.type === "pause") player.pauseVideo();
      if (data.type === "seek") player.seekTo(data.time, true);
    }
  };

  // Sync function to send playback data
  const sendSyncData = (data) => {
    if (isHost) {
      connections.forEach((conn) => conn.send(data));
    }
  };

  const onYouTubeReady = (event) => {
    setPlayer(event.target);
  };

  const onYouTubeStateChange = (event) => {
    if (isHost) {
      if (event.data === 1) sendSyncData({ type: "play" });
      if (event.data === 2) sendSyncData({ type: "pause" });
    }
  };

  const handleSeek = () => {
    if (isHost) {
      const time = player.getCurrentTime();
      sendSyncData({ type: "seek", time });
    }
  };

  return (
    <div className="w-full h-[450px] bg-black flex items-center justify-center text-gray-300 rounded-lg shadow-lg">
      {isLoading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="text-lg"
        >
          Loading Video...
        </motion.div>
      ) : (
        <>
          {videoType === "youtube" && (
            <YouTube
              videoId={videoId}
              onReady={onYouTubeReady}
              onStateChange={onYouTubeStateChange}
              className="w-full max-w-2xl rounded-lg shadow-lg"
            />
          )}

          {videoType === "local" && (
            <motion.video
              ref={videoRef}
              controls
              autoPlay
              onPlay={() => isHost && sendSyncData({ type: "play" })}
              onPause={() => isHost && sendSyncData({ type: "pause" })}
              onSeeked={handleSeek}
              className="w-full max-w-2xl rounded-lg shadow-lg"
            >
              <source src="your-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </motion.video>
          )}
        </>
      )}
    </div>
  );
}
