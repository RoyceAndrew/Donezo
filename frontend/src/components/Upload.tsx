import axios from "axios";
import { useState, FormEvent } from "react";
import { useDonezoContext } from "../hooks/useDonezoContext";

const Upload = () => {
  const [task, setTask] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [dl, setDl] = useState<string>("");
  const [err, setErr] = useState<string | null>(null);
  const [ctask, setCtask] = useState<boolean>(false);
  const [cprior, setCprior] = useState<boolean>(false);
  const [cdl, setCdl] = useState<boolean>(false);
  const [, dispatch] = useDonezoContext();

  const getData = async () => {
    try {
      const getLocal = JSON.parse(localStorage.getItem("user") || "{}");
      const token = getLocal.token;

      if (!token) {
        throw new Error("User token not found in localStorage");
      }

      const respond = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/donezo/`,
        {
          title: task,
          priority,
          deadline: dl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = respond.data;
      dispatch({ type: "CREATE_WORKOUT", payload: result });

      // Reset form state
      setCtask(false);
      setCprior(false);
      setCdl(false);
      setTask("");
      setPriority("");
      setDl("");
      setErr(null);
    } catch (error: any) {
      if (error.response) {
        setErr(error.response.data.mssg);
        const check = error.response.data.check;

        // Update validation states
        setCtask(check.includes("Task"));
        setCprior(check.includes("Priority"));
        setCdl(check.includes("Deadline"));
      } else {
        setErr("An unexpected error occurred");
      }
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    getData();
  };

  return (
    <div className="h-min xl:w-[400px] w-[90%] flex flex-col xl:mr-10 xl:mt-10 mt-5 dark:bg-[#526D82] dark:text-white bg-[#A0DEFF] rounded-md p-5">
      <form onSubmit={handleSubmit}>
        <label className="flex flex-col text-2xl pb-3">
          Task:
          <input
            placeholder="Do some work"
            onChange={(e) => setTask(e.target.value)}
            className={`dark:bg-[#27374D] ring-4 rounded ${
              ctask ? "ring-red-600" : "dark:ring-slate-900 ring-blue-400"
            }`}
            value={task}
            type="text"
          />
        </label>
        <label className="flex flex-col text-2xl pb-3">
          Priority:
          <select
            className={`dark:bg-[#27374D] ring-4 rounded ${
              cprior ? "ring-red-600" : "dark:ring-slate-900 ring-blue-400"
            }`}
            onChange={(e) => setPriority(e.target.value)}
            value={priority}
          >
            <option value="">...</option>
            <option value="HIGH">HIGH</option>
            <option value="MID">MID</option>
            <option value="LOW">LOW</option>
          </select>
        </label>
        <label className="flex flex-col text-2xl pb-3">
          Deadline:
          <input
            className={`dark:bg-[#27374D] ring-4 rounded ${
              cdl ? "ring-red-600" : "dark:ring-slate-900 ring-blue-400"
            }`}
            onChange={(e) => setDl(e.target.value)}
            value={dl}
            id="calendar"
            type="date"
          />
        </label>
        <button
          className="h-[35px] dark:bg-slate-900 font-bold hover:text-yellow-200 hover:dark:bg-slate-700 hover:bg-[#5AB2FF] transition-all duration-500 bg-white w-[100px] rounded-md relative left-[50%] ml-[-50px]"
          type="submit"
        >
          Submit
        </button>
      </form>
      {err && (
        <div className="ring-red-900 ring-2 w-auto h-auto bg-red-300 p-3 mt-5">
          <p className="text-red-900">Error: {err}</p>
        </div>
      )}
    </div>
  );
};

export default Upload;