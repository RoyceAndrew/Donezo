import express from "express";
import env from "dotenv";
import routerDonezo from "./router/donezo.js"
import mongoose from "mongoose";
import cors from "cors";
import routerUser from "./router/user.js";



const app = express()
env.config()

app.use(cors())

app.use(express.json())



app.use('/api/donezo', routerDonezo)

app.use('/api/user', routerUser)



mongoose.connect(process.env.DB_URL).then(() => {
app.listen(process.env.PORT, () => {
    console.log("the backend server now running on " + process.env.PORT)
})
}).catch((err) => {
    console.log(err)
})


