import React, { createContext, useContext, useState } from "react";

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
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  // Combine state and actions
  const state: State = { loggedIn, userId, username, email };
  const actions: Actions = { setLoggedIn, setUserId, setUsername, setEmail };

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
