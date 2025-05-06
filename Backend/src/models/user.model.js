import mongoose from "mongoose";
import { Schema } from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from'bcrypt'

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },email: {
        type: String,
        required: true,
        unique: true
    },password: {
        type: String,
        required: true
    }
},{timestamps: true})

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password,8)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateToken = function (){
    return jwt.sign({_id: this._id},
        process.env.TOKEN_SECRET,
        {expiresIn: '24h'}
    )
}


const User = mongoose.model('User',userSchema)

export default User