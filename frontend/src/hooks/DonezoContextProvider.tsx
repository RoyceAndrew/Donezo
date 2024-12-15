import { useReducer, ReactNode } from "react";
import DonezoContext from "../context/DonezoContext";

export const donezoReducer = (state: any, action: any) => {
    switch (action.type) {
        case "SET_DONEZO":
            return { donezo: action.payload };
        case "CREATE_WORKOUT":
            return { donezo: [action.payload, ...state.donezo] };
        case "DELETE_DONEZO":
            return { donezo: state.donezo.filter(d => {
               return action.payload._id != d._id
            })};
        default:
            return state;
    }
};

const DonezoProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(donezoReducer, { donezo: [] });

    return (
        <DonezoContext.Provider value={[state.donezo, dispatch]}>
            {children}
        </DonezoContext.Provider>
    );
};

export default DonezoProvider;