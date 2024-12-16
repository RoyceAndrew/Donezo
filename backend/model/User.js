import mongoose from "mongoose";
import bcrypt from "bcrypt"
import validator from "validator"

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {    
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
})

userSchema.statics.signUp = async function(email, password) {
    if (!email || !password) {
        throw Error("All fields must be filled")
    }
    if (!validator.isEmail(email)) {
        throw Error("Email is not valid")
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("Password must be at least 8 characters long, contain uppercase letters, numbers, and special characters.")
    }

    const exists = await this.findOne({email})
    if (exists) {
        throw Error("Email already in use")
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({email, password: hash})
    return user
}

userSchema.statics.loginUser = async function(email, password) {
    if (!email || !password) {
        throw Error("All fields must be filled")
    }

    const exist = await this.findOne({email})

    if (!exist) {
        throw Error("Input the right email")
    }

    const check = await bcrypt.compare(password, exist.password)

    if (!check) {
        throw Error("Password wrong")
    } 

    return exist
}

export default mongoose.model('User', userSchema);
