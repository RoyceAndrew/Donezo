import express from "express";
import env from "dotenv";
import routerDonezo from "./router/donezo.js"
import mongoose from "mongoose";
import cors from "cors";
import routerUser from "./router/user.js";



const app = express()
env.config()

app.use(cors({
  origin: process.env.FRONTEND_URL, 
  methods: 'GET,POST,PUT,DELETE',
}));

app.use(express.json())



app.use('/api/donezo', routerDonezo)

app.use('/api/user', routerUser)



mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

export default app;
