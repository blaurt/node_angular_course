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
const position_1 = require("../models/position");
function getPositionByCategoryId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { categoryId } = req.params;
        const { id: userId } = req.user;
        console.log("userId", userId);
        const positions = yield position_1.Position.find({ categoryId, userId });
        return res.send(positions);
    });
}
exports.getPositionByCategoryId = getPositionByCategoryId;
function createPosition(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, cost, categoryId } = req.body;
        const { id: userId } = req.user;
        const newPosition = new position_1.Position({
            name,
            cost,
            categoryId,
            userId
        });
        yield newPosition.save();
        return res.send(newPosition);
    });
}
exports.createPosition = createPosition;
function updatePosition(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const position = yield position_1.Position.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true });
        return res.send(position);
    });
}
exports.updatePosition = updatePosition;
function deletePositionById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        yield position_1.Position.deleteOne({ _id: id });
        return res.status(204).send();
    });
}
exports.deletePositionById = deletePositionById;
//# sourceMappingURL=position.js.map