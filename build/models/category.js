"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageSrc: {
        type: String,
        default: null
    },
    userId: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId
    }
});
exports.Category = mongoose.model("categories", categorySchema);
//# sourceMappingURL=category.js.map