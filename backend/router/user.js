import express from "express"
import {signupController, loginController} from "../controller/userController.js"

const router = express.Router()

router.post("/login", loginController)

router.post("/register", signupController)

export default router
