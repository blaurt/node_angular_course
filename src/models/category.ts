import * as mongoose from 'mongoose';

const categorySchema: mongoose.Schema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    imageSrc: {
        type: String,
        default: null
    },
    user: {
        ref: 'users',
        type: mongoose.Schema.Types.ObjectId
    }
})

export default mongoose.model('categories', categorySchema)