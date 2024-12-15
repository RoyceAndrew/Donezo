import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useUserContext } from "../hooks/useUserContext"
import { useDonezoContext } from "../hooks/useDonezoContext"

function Nav() {
    const [darkI, setDarkI] = useState(true)
    const [vis, setVis] = useState(false)
    const [user, dispatch] = useUserContext()
    const [donezo, dispatchDonezo] = useDonezoContext();
    
    const [lScroll, setLscr] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const scroll = window.scrollY
            
            if (scroll > lScroll) {
                setVis(true)
            } else if (scroll < lScroll) {
                setVis(false)
            }
            setLscr(scroll)
            console.log(vis)
        }
        window.addEventListener("scroll", handleScroll)

        return () => {
            return window.removeEventListener("scroll", handleScroll)
        }

    },[lScroll])
    

    function darkMode() {
    
        const element = document.getElementsByTagName("html")[0]
        const background = document.getElementsByTagName("body")[0]
        if (element.classList.value == "") {
        setDarkI(false)
        background.className = "darkbackground"
        element.className = "dark"
        } else if (element.classList.value == "dark") {
           element.className = ""
           background.className = ""
           setDarkI(true)
        }
    }

    function handleClick() {
        localStorage.removeItem("user")
        dispatch({type: "LOGOUT"})
        dispatchDonezo({type: "SET_DONEZO", payload: []})
    }

    return <nav className={"w-full xl:h-28 dark:bg-[#27374D] fixed  left-0 bg-[#5AB2FF] flex items-center xl:px-10 justify-between z-50 top-0  transition-all  duration-700 " + (vis ? "mt-[-6%]" : "mt-[0]")}>
    <h1 className="xl:text-5xl text-4xl text-white">Donezo</h1>
    <div className="flex items-center gap-5">
    {user ? (<button onClick={handleClick} className="text-white font-bold hover:text-yellow-300 transition-all duration-300">Log Out</button>)
    : (<><Link to="/login" className="text-white font-bold hover:text-yellow-300 transition-all duration-300">Login</Link>
    <Link to="/signup" className="text-white font-bold hover:text-yellow-300 transition-all duration-300">Sign Up</Link></>)}
    <i className={darkI ? "bi bi-moon-stars-fill text-white text-2xl bg-transparent h-16 pt-4 pl-5 w-16 rounded-full transition-all duration-700 hover:bg-[#27374D]  hover:text-yellow-300" :"bi bi-brightness-high-fill text-white text-2xl bg-transparent h-16 pt-4 pl-5 w-16 rounded-full transition-all duration-700 hover:bg-[#5AB2FF] hover:text-yellow-300"} onClick={darkMode}></i>
    </div>
    </nav>
}

export default Nav;