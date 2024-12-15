import { useState } from "react"
import { useUserContext } from "../hooks/useUserContext"
import axios from "axios"


export const useLogin = () => {
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(null) 
   const [user, dispatch] = useUserContext()
   

   const userr = async (email, password) => {
    setLoading(true)
    setError(null)

    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`, {email, password})
        const result = response.data
        dispatch({type: "LOGIN", payload: result})
        localStorage.setItem("user", JSON.stringify(result))
        setError(null)
        setLoading(false)
        } catch (err) {
          setError(err.response.data.msg)
          setLoading(false)
        }
        

}
return {userr, loading, error}
}
