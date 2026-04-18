import React, { useState, useEffect, useContext, createContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children, userId }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Only connect if we actually have a userId
    if (!userId) {
      console.log("No user Id Found .socket is stand by");
      if (socket) socket.disconnect();
      return;
    }

    const newSocket = io("http://localhost:5000", {
      query: { userId },
      withCredentials: true,
    });

    // 3. THE LOG: Verify it's working
    console.log(`[SOCKET] Attempting connection for User: ${userId}`);

    newSocket.on("connect", () => {
      console.log(`[SOCKET] Connected successfully! ID: ${newSocket.id}`);
    });

    newSocket.on("connect_error", (err) => {
      console.error("[SOCKET] Connection Failed:", err.message);
    });
    setSocket(newSocket);

    // Clean up on unmount or if userId changes
    return () => {
      console.log("[SOCKET] Disconnecting...");
      newSocket.disconnect(); 
    }
  }, [userId]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
