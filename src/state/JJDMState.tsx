import React, { createContext, useContext, useState, useEffect } from "react";

// Define types for the state and actions
interface State {
  loggedIn: boolean;
  userId: string;
  username: string;
  email: string;
}

interface Actions {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

// Define the structure of the context
interface ContextType {
  state: State;
  actions: Actions;
}

// Create the context with the appropriate type
const JJDMStateContext = createContext<ContextType | null>(null);

// Provider component
export const JJDMStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // State values
  const [loggedIn, setLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("loggedIn") === "true"; // Initialize from localStorage
  });
  const [userId, setUserId] = useState<string>(
    () => localStorage.getItem("userId") || ""
  );
  const [username, setUsername] = useState<string>(
    () => localStorage.getItem("username") || ""
  );
  const [email, setEmail] = useState<string>(
    () => localStorage.getItem("email") || ""
  );

  // Combine state and actions
  const state: State = { loggedIn, userId, username, email };
  const actions: Actions = { setLoggedIn, setUserId, setUsername, setEmail };

  // Persist state to localStorage
  useEffect(() => {
    if (loggedIn) {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("userId", userId);
      localStorage.setItem("username", username);
      localStorage.setItem("email", email);
    } else {
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
    }
  }, [loggedIn, userId, username, email]);

  return (
    <JJDMStateContext.Provider value={{ state, actions }}>
      {children}
    </JJDMStateContext.Provider>
  );
};

// Custom hook to access the context
export const useJJDMState = (): ContextType => {
  const context = useContext(JJDMStateContext);
  if (!context) {
    throw new Error("useJJDMState must be used within a JJDMStateProvider");
  }
  return context;
};
