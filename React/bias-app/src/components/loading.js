import React, { useState, useEffect } from "react";
import BeatLoader from "react-spinners/BeatLoader";

const LoadingComponent = ({ loading }) => {
  const messages = [
    "Retrieving column names...",
    "Analyzing your dataset...",
    "Detecting biases...",
    "Generating heatmap...",
    "Fetching data from OpenAI...",
    "Baking cookies...",
    "Getting ready...",
    "A little bit more...",
  ];
  const [currentMessage, setCurrentMessage] = useState(messages[0]);
  let messageIndex = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      setCurrentMessage(messages[messageIndex]);
    }, 2500); // Change text every 2.5 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div className="loading">
      <BeatLoader color="#36D7B7" loading={loading} size={15} />
      <div className="loading-message">{currentMessage}</div>
    </div>
  );
};

export default LoadingComponent;
