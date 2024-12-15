import Donezo from "../model/Donezo.js";

const donezoGetAll = async (req, res) => {
    try {
        const donezo = await Donezo.find({user_id: req.user._id}).sort({deadline: 1})
        res.status(200).json(donezo)
    }catch(err) {
        res.status(400).json({"mssg": err.message})
    }
}

const donezoGetOne = async (req, res) => {
    const id = req.params.id

    try {
        const donezo = await Donezo.findById(id)
        res.status(200).json(donezo)
    }catch(err) {
        res.status(400).json({"mssg": err.message})
    }
}

const donezoDelete = async (req, res) => {
    const id = req.params.id

    try {
        const donezo = await Donezo.findByIdAndDelete(id)
        res.status(200).json(donezo)
    }catch(err) {
        res.status(400).json({"mssg": err.message})
    }
}

const donezoUpdate = async (req, res) => {
    const id = req.params.id
    const {title, priority, deadline, user_id} = req.body;
    


    try {
        const donezo = await Donezo.findByIdAndUpdate(id, {title, priority, deadline})
        res.status(200).json(donezo)
    }catch(err) {
        res.status(400).json({"mssg": err.message})
    }
}

const donezoPost = async (req, res) => {
    const {title, priority, deadline} = req.body


    const check = [];

    if (!title) {
        check.push("Task")
    }
    if (!priority) {
        check.push("Priority")
    }
    if (!deadline) {
        check.push("Deadline")
    }
    if (check.length > 0) {
        res.status(400).json({"mssg": `Please fill ${check} section`, "check": check})
    } else {
    
        const user_id = req.user._id
        
        const donezo = await Donezo.create({title, priority, deadline, user_id})
        res.status(200).json(donezo);
    }

}

export {donezoGetAll, donezoGetOne, donezoUpdate, donezoDelete, donezoPost}