import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Controls() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex space-x-4">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsPlaying(!isPlaying)}
        className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg shadow-md"
      >
        {isPlaying ? "Pause ⏸️" : "Play ▶️"}
      </motion.button>
    </div>
  );
}
