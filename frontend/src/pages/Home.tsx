import Nav from "../components/Nav";
import { useEffect, useContext, useState } from "react";
import DoneList from "../components/DoneList";
import Upload from "../components/Upload";
import axios from "axios";
import DonezoContext from "../context/DonezoContext";

type DonezoItem = {
  _id: string;
  title: string;
  priority: string;
  deadline: string;
};

function Home() {
  // Menggunakan objek context dengan tipe eksplisit
  const { donezo, dispatch } = useContext(DonezoContext) as {
    donezo: DonezoItem[];
    dispatch: React.Dispatch<any>;
  };

  const [check, setCheck] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const getLocal = JSON.parse(localStorage.getItem("user") || "{}");
        const token = getLocal?.token;

        if (!token) {
          throw new Error("User token not found");
        }

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/donezo/`, {
          headers: { Authorization: "Bearer " + token },
        });

        const result: DonezoItem[] = response.data;
        dispatch({ type: "SET_DONEZO", payload: result });
      } catch (err: any) {
        console.error(err.message);
      }
    };
    getData();
  }, [dispatch]);

  useEffect(() => {
    setCheck(donezo.length === 0);
  }, [donezo]);

  return (
    <>
      <Nav />
      <div className="flex xl:flex-row flex-col-reverse xl:items-start w-[100%] items-center justify-center mt-24 xl:h-[80vh]">
        <section className="xl:w-[80em] w-[90%] h-[500px] mb-10 xl:h-[100%] dark:bg-[#526D82] bg-[#A0DEFF] xl:m-10 mt-10 rounded-md py-1 overflow-auto">
          {donezo &&
            donezo.map((d: DonezoItem) => (
              <DoneList
                title={d.title}
                key={d._id}
                id={d._id}
                priority={d.priority}
                date={d.deadline}
              />
            ))}
          <div
            className={
              check
                ? "visible h-full w-full flex justify-center items-center flex-col"
                : "collapse"
            }
          >
            <h1 className="font-bold xl:text-[200px] text-[150px] text-blue-400 dark:text-slate-700 select-none">
              !
            </h1>
            <h1 className="font-bold xl:text-[80px] text-[60px] text-blue-400 dark:text-slate-700 select-none mt-[-60px]">
              No Task
            </h1>
          </div>
        </section>
        <Upload />
      </div>
    </>
  );
}

export default Home;