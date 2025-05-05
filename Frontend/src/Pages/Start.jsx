// Start.jsx
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Start = () => {
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  // Auto-redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleStart = () => {
    navigate("/login");
  };

  return (
    <div className="start-page">
      <h1>Welcome to the App</h1>
      <button onClick={handleStart}>Start</button>
    </div>
  );
};

export default Start;
