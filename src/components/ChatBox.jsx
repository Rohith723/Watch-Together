import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() !== "") {
      setMessages([...messages, input]);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-2 p-2 border-b border-gray-700">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-blue-500 p-2 rounded-lg text-white text-sm"
          >
            {msg}
          </motion.div>
        ))}
      </div>

      {/* Input Box */}
      <div className="flex p-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded-lg"
          placeholder="Type a message..."
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={sendMessage}
          className="ml-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
        >
          Send
        </motion.button>
      </div>
    </div>
  );
}
