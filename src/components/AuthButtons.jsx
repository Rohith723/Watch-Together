import React, { useState } from "react";

export default function AuthButtons({ onLogin, onSignup }) {
  const [loading, setLoading] = useState(false);
  const [buttonType, setButtonType] = useState(""); // Track which button is clicked

  const handleClick = async (type) => {
    setLoading(true);
    setButtonType(type);

    // Simulate API call delay
    setTimeout(() => {
      if (type === "login") onLogin();
      if (type === "signup") onSignup();
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="flex space-x-4">
      <button
        className={`px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 transform ${
          loading && buttonType === "login" ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 active:scale-95"
        }`}
        disabled={loading}
        onClick={() => handleClick("login")}
      >
        {loading && buttonType === "login" ? "Logging in..." : "Login"}
      </button>

      <button
        className={`px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 transform ${
          loading && buttonType === "signup" ? "bg-gray-500 cursor-not-allowed" : "bg-green-500 hover:bg-green-600 active:scale-95"
        }`}
        disabled={loading}
        onClick={() => handleClick("signup")}
      >
        {loading && buttonType === "signup" ? "Signing up..." : "Signup"}
      </button>
    </div>
  );
}
