import * as mongoose from 'mongoose';

const positionSchema: mongoose.Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    category:{
        ref: 'categories',
        type: mongoose.Schema.Types.ObjectId
    },
    user:{
        ref: 'users',
        type: mongoose.Schema.Types.ObjectId
    }
})

export default mongoose.model('positions', positionSchema)