"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
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
    userId: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId
    }
});
exports.Order = mongoose.model("orders", orderSchema);
//# sourceMappingURL=order.js.map