import User from "../model/User.js"
import jwt from "jsonwebtoken"

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: "3d" })
}

const signupController = async (req, res) => {
    const {email, password} = req.body
   
   try {
   const register = await User.signUp(email, password)
   const token = createToken(register._id) 
   res.status(200).json({register, token})
   } catch (error) {
       res.status(400).json({"msg": error.message})
   }
}

const loginController = async (req, res) => {
    const {email, password} = req.body

    try {
        const json = await User.loginUser(email, password);
        const token = createToken(json._id) 
        res.status(200).json({json, token})
    } catch (err) {
        res.status(400).json({"msg": err.message})
    }
}

export {signupController, loginController}