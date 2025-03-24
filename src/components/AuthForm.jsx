import React, { useState } from "react";
import { motion } from "framer-motion";

export default function AuthForm({ type, onSubmit }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("All fields are required!");
      return;
    }
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-96"
    >
      <h2 className="text-2xl font-bold text-center mb-4">
        {type === "login" ? "Login" : "Signup"}
      </h2>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.password}
          onChange={handleChange}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition duration-300"
        >
          {type === "login" ? "Login" : "Sign Up"}
        </motion.button>
      </form>

      <p className="text-center mt-4">
        {type === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
        <a
          href={type === "login" ? "/signup" : "/login"}
          className="text-blue-400 hover:underline"
        >
          {type === "login" ? "Sign Up" : "Login"}
        </a>
      </p>
    </motion.div>
  );
}
