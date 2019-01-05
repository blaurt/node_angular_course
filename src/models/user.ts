import * as mongoose from 'mongoose';

const userSchema: mongoose.Schema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
})

export default mongoose.model('users',userSchema)