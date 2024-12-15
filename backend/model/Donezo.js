import mongoose from "mongoose";

const Schema = mongoose.Schema

const donezoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        required: true,
    },
    deadline: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    }
}, {timestamps: true});


export default mongoose.model('Donezo', donezoSchema);