import { useContext } from "react";
import UserContext from "../context/UserContext";

export const useUserContext = () => {
    const context = useContext(UserContext)

    if (!context) {
        throw Error("Must use this inside of UserContextProvider")
    }

    return context
}