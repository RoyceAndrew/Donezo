import { ReactNode, useEffect, useReducer } from "react";
import UserContext from "../context/UserContext";


interface UserState {
  user: any | null;
}

interface UserAction {
  type: string;
  payload?: any;
}

export const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state; 
  }
};

interface UserContextProviderProps {
  children: ReactNode;
}

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [state, dispatch] = useReducer(userReducer, { user: null });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user") || "null");

    if (data) {
      dispatch({ type: "LOGIN", payload: data });
    }
  }, []);

  return (
    <UserContext.Provider value={[state.user, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;