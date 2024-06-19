import React, { useEffect, useState } from "react";
import { MessageProps } from "../../types/systemTypes";

const Message: React.FC<MessageProps> = ({ type, content, showTime = 3, onDisappear }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onDisappear) {
        onDisappear(); // Call the callback function
      }
    }, showTime * 1000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [showTime, onDisappear]);

  if (!visible) return null;

  const messageStyle: React.CSSProperties = {
    // position: "fixed",
    top: 0,
    width: "100%",
    height: "30px",
    lineHeight: "30px",
    textAlign: "center",
    backgroundColor: type === "success" ? "lightgreen" : "lightcoral",
    color: "#fff",
    zIndex: 1000,
  };

  return <div style={messageStyle}>{content}</div>;
};

export default Message;
