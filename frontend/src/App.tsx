import Home from "./pages/Home"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useUserContext } from "./hooks/useUserContext";

function App() {
  const [user, dispatch] = useUserContext() 

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate  to="/login"/>}/>
        <Route path="/login" element={!user ? <Login /> : <Navigate  to="/"/>} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate  to="/"/>} />
      </Routes>
      
      </BrowserRouter>
    </>
  )
}

export default App
