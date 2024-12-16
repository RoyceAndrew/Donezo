import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDonezoContext } from "../hooks/useDonezoContext";

type DoneType = {
  title: string;
  priority: string;
  date: string;
  id: string;
};

type NewType = {
    token: string;
};

type UserType = NewType;

function DoneList({ title, priority, date, id }: DoneType) {
  const [, dispatch] = useDonezoContext();
  const [outDated, setOutDated] = useState(false);

  const checkAgo = formatDistanceToNow(new Date(date), { addSuffix: true });

  useEffect(() => {
    setOutDated(checkAgo.includes("ago"));
  }, [checkAgo]);

  const deleteData = async () => {
    try {
      const getLocal = localStorage.getItem("user");
      if (!getLocal) {
        throw new Error("User not found in localStorage");
      }
      const { token }: UserType = JSON.parse(getLocal);

      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/donezo/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = res.data;
      dispatch({ type: "DELETE_DONEZO", payload: result });
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleDelete = () => {
    deleteData();
  };

  return (
    <div className="m-5 p-1 ring-4 ring-blue-400 dark:ring-slate-900 rounded bg-white dark:bg-[#27374D] break-all dark:text-white wra flex justify-between">
      <div>
        <p className="text-3xl">{title}</p>
        <p className="text-2xl">{priority}</p>
        <p
          className={
            "text-2xl " + (outDated ? "text-red-700" : "text-black dark:text-white")
          }
        >
          {formatDistanceToNow(new Date(date), { addSuffix: true })}
        </p>
      </div>
      <div>
        <i
          onClick={handleDelete}
          className="bi bi-trash cursor-pointer text-3xl hover:text-red-600 transition-all duration-500"
        ></i>
      </div>
    </div>
  );
}

export default DoneList;