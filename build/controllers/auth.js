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
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user_1 = require("../models/user");
const main_1 = require("../config/main");
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const user = yield user_1.User.findOne({ email });
        if (!user) {
            return res.status(404).send("user not found");
        }
        const isPasswordValid = yield bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).send("invalid password");
        }
        const token = jwt.sign({ email: user.email, userId: user._id }, main_1.config.jwtKey, {
            expiresIn: 3600
        });
        res.send({ token: `Bearer ${token}` });
    });
}
exports.login = login;
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const existingUser = yield user_1.User.findOne({ email });
        if (existingUser) {
            // TODO implement user exist error
            res.status(409).send("Email is in use");
        }
        const salt = yield bcryptjs.genSalt(10);
        const newUser = new user_1.User({
            email,
            password: yield bcryptjs.hash(password, salt)
        });
        yield newUser.save();
        return res.status(201).send(newUser);
    });
}
exports.register = register;
//# sourceMappingURL=auth.js.map