import UserContext from "../context/UserContext";
import { useReducer, ReactNode, useEffect } from "react";

export const userReducer = (state: any, action: any) => {
    switch (action.type) {
        case "LOGIN":
            return {user: action.payload}
        case "LOGOUT": 
            return {user: null}
        default: 
        state
    }
}

const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(userReducer, {user: null})

    useEffect(() => {
      const data = JSON.parse(localStorage.getItem("user"))

      if (data) {
        dispatch({type: "LOGIN", payload: data})
      }
    }, [])

    return <UserContext.Provider value={[state.user, dispatch]}>
        {children}
    </UserContext.Provider>
}

export default UserContextProvider