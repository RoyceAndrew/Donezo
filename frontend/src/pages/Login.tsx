import { useState, FormEvent } from "react";
import Nav from "../components/Nav";
import { useLogin } from "../hooks/useLogin";



function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Deklarasikan tipe hasil dari hook useLogin
  const { userr, loading, error } = useLogin();

  // Menambahkan tipe untuk event parameter
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    userr(email, password);  // pastikan userr merupakan fungsi dengan parameter email dan password
  }

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <Nav />
      <form
        className="flex justify-center items-center flex-col gap-2 dark:bg-[#526D82] dark:text-white bg-[#A0DEFF]  p-5 rounded tex"
        onSubmit={handleSubmit}
      >
        <label className="flex flex-col text-2xl">
          Email:
          <input
            className="dark:bg-[#27374D] text-xl w-[300px] rounded "
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
          />
        </label>
        <label className="flex flex-col text-2xl">
          Password:
          <input
            className="dark:bg-[#27374D] w-[300px] rounded "
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
          />
        </label>
        <button
          className=" p-2 text-2xl mt-1 dark:bg-slate-900 font-bold dark:hover:text-yellow-200 hover:text-yellow-200 hover:dark:bg-slate-700 hover:bg-[#5AB2FF] transition-all duration-500 dark:text-white bg-white w-[100px] rounded-md "
          disabled={loading}
          type="submit"
        >
          Login
        </button>
        {error && (
          <div className="ring-red-900 w-full ring-2  h-auto bg-red-300 p-3 mt-5">
            <p className="text-red-900">Error: {error}</p>
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;