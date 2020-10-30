import { model, Schema } from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    username: {
        unique: true,
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    modified_at: {
        type: Date
    },
    registered_at: {
        type: Date,
    }
})

userSchema.pre('save', async function (){
    if(this.isModified('password')){
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(this.password, salt)
        this.password = hash
    }
})

userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password)
}



export default model('User', userSchema)