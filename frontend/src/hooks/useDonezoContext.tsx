import DonezoContext from "../context/DonezoContext";
import { useContext } from "react";

export const useDonezoContext = () => {
    const context = useContext(DonezoContext)

    if (!context) {
        throw Error("Must use this inside of DonezoProvider")
    }

    return context
}