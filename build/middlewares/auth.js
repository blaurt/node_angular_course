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
const passportJwt = require("passport-jwt");
const main_1 = require("../config/main");
const user_1 = require("../models/user");
const options = {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: main_1.config.jwtKey
};
exports.useJwt = (passportObj) => {
    passportObj.use(new passportJwt.Strategy(options, (payload, verify) => __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_1.User.findById(payload.userId).select("email id");
            if (!user) {
                return verify(null, false);
            }
            verify(null, user);
        }
        catch (e) {
            // console.error(e);
        }
    })));
};
//# sourceMappingURL=auth.js.map