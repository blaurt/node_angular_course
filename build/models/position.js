"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const positionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    categoryId: {
        ref: "categories",
        type: mongoose.Schema.Types.ObjectId
    },
    userId: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId
    }
});
exports.Position = mongoose.model("positions", positionSchema);
positionSchema.methods.findByCondition = function (condition) {
    return __awaiter(this, void 0, void 0, function* () {
        const position = yield exports.Position.find(condition);
        return position;
    });
};
//# sourceMappingURL=position.js.map