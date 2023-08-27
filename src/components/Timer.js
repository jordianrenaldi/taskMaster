import React, { useState, useEffect } from "react";

function Timer({ totalDuration }) {
  const [remainingSeconds, setRemainingSeconds] = useState(totalDuration);

  useEffect(() => {
    if (remainingSeconds > 0) {
      const interval = setInterval(() => {
        setRemainingSeconds((prevRemaining) => prevRemaining - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [remainingSeconds]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <>
      {remainingSeconds > 0 && (
        <div
          style={{
            position: "fixed",
            top: "90px", // Adjust the distance from the top
            right: "15px", // Adjust the distance from the left
            zIndex: 1000, // Adjust the z-index if needed
            backgroundColor: "#a6ebc3", // Add a background color
            borderRadius: "4px",
            padding: "5px 10px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p>Time remaining: {formatTime(remainingSeconds)}</p>
        </div>
      )}
    </>
  );
}

export default Timer;
