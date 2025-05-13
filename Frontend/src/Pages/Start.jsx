import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Start = () => {
  const auth = useSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();

  // Auto-redirect if user is already logged in
  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth, navigate]);

  const handleStart = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-200 to-blue-400">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to the App</h1>
        <button
          onClick={handleStart}
          className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default Start;
