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
const category_1 = require("../models/category");
const position_1 = require("../models/position");
function getCategoryList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const categories = yield category_1.Category.find({ userId: req.user.id });
        return res.status(200).json(categories);
    });
}
exports.getCategoryList = getCategoryList;
function getCategoryByid(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const category = yield category_1.Category.findById(req.params.id);
        return res.status(200).json(category);
    });
}
exports.getCategoryByid = getCategoryByid;
function deleteCategoryById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("dekete");
        yield category_1.Category.remove({ _id: req.params.id });
        yield position_1.Position.remove({ category: req.params.id });
        return res.status(200).json({
            message: "Категория удалена."
        });
    });
}
exports.deleteCategoryById = deleteCategoryById;
function createCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const category = new category_1.Category({
            name: req.body.name,
            userId: req.user.id,
            imageSrc: req.file ? req.file.path : ""
        });
        yield category.save();
        return res.status(201).json(category);
    });
}
exports.createCategory = createCategory;
function updateCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("updateCategory");
        const updated = {
            name: req.body.name
        };
        if (req.file) {
            updated.imageSrc = req.file.path;
        }
        console.log("updated", updated);
        const category = yield category_1.Category.findOneAndUpdate({ _id: req.params.id }, { $set: updated }, { new: true });
        return res.status(200).json(category);
    });
}
exports.updateCategory = updateCategory;
//# sourceMappingURL=category.js.map