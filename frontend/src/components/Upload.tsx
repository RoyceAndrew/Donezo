import axios from "axios";
import { useState } from "react";
import { useDonezoContext } from "../hooks/useDonezoContext";

function Upload() {
    const [task, setTask] = useState("");
    const [priority, setPriority] = useState("");
    const [dl, setDl] = useState("");
    const [err, setErr] = useState(null);
    const [ctask, setCtask] = useState(false);
    const [cprior, setCprior] = useState(false)
    const [cdl, setCdl] = useState(false)
    const [donezo, dispatch] = useDonezoContext()

    const getData = async () => {
        try {
            const getLocal = JSON.parse(localStorage.getItem("user"))
           const token = getLocal.token
           
            const respond = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/donezo/`, {
                title: task,
                priority: priority,
                deadline: dl,
            }, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            const result = respond.data
            dispatch({type: "CREATE_WORKOUT", payload: result})
            setCtask(false)
            setCprior(false)
            setCdl(false)
            setPriority("")
        setDl("")
        setTask("")
         setErr(null);
        } catch (error) {
           setErr(error.response.data.mssg); 
           const check = error.response.data.check;
           if (check.includes("Task")) {
              setCtask(true)
           } else {
            setCtask(false)
           }
           if (check.includes("Priority")) {
            setCprior(true)
         } else {
            setCprior(false)
         }
         if (check.includes("Deadline")) {
            setCdl(true)
         } else {
          setCdl(false)
         }
       }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        !getData();
    };

    return (
        <div className="h-min xl:w-[400px] w-[90%] flex flex-col xl:mr-10 xl:mt-10 mt-5 dark:bg-[#526D82] dark:text-white bg-[#A0DEFF] rounded-md p-5">
            <form onSubmit={handleSubmit}>
                <label className="flex flex-col text-2xl pb-3">
                    Task:
                    <input placeholder="Do some work" onChange={(e) => setTask(e.target.value)} className={"dark:bg-[#27374D] ring-4 rounded " + (ctask ? "ring-red-600" : "dark:ring-slate-900 ring-blue-400")} value={task} type="text" />
                </label>
                <label className="flex flex-col text-2xl pb-3">
                    Priority:
                    <select className={"dark:bg-[#27374D] ring-4 rounded " + (cprior ? "ring-red-600" : "dark:ring-slate-900 ring-blue-400")} onChange={(e) => setPriority(e.target.value)} value={priority}>
                        <option value="">...</option>
                        <option value="HIGH">HIGH</option>
                        <option value="MID">MID</option>
                        <option value="LOW">LOW</option>
                    </select>
                </label>
                <label className="flex flex-col text-2xl pb-3">
                    Deadline:
                    <input className={"dark:bg-[#27374D] ring-4 rounded " + (cdl ? "ring-red-600" : "dark:ring-slate-900 ring-blue-400")} onChange={(e) => setDl(e.target.value)} value={dl} id="calendar" type="date" />
                </label>
                <button className="h-[35px] dark:bg-slate-900 font-bold hover:text-yellow-200 hover:dark:bg-slate-700 hover:bg-[#5AB2FF] transition-all duration-500 bg-white w-[100px] rounded-md relative left-[50%] ml-[-50px]" type="submit">
                    Submit
                </button>
            </form>
            {err && <div className="ring-red-900 ring-2 w-auto h-auto bg-red-300 p-3 mt-5"><p className="text-red-900">Error: {err}</p></div>}
        </div>
    );
}

export default Upload;