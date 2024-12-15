import express from "express";
import {auth} from "../middleware/auth.js";
import { donezoGetAll, donezoGetOne, donezoUpdate, donezoDelete, donezoPost } from "../controller/donezoController.js";
const router = express.Router()

router.use(auth)

router.get("/", donezoGetAll)

router.get("/:id", donezoGetOne)

router.post("/", donezoPost)

router.delete("/:id", donezoDelete)

router.patch("/:id", donezoUpdate)

export default router