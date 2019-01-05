import * as mongoose from 'mongoose';

const orderSchema: mongoose.Schema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    order: {
        type: Number,
        required: true
    },
    list: [
        {
            name: {
                type: String
            },
            quantity: {
                type: Number
            },
            cost: {
                type: Number
            }
        }
    ],
    user: {
        ref: 'users',
        type: mongoose.Schema.Types.ObjectId
    }
})

export default mongoose.model('orders', orderSchema)