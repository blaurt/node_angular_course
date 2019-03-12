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
const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const main_1 = require("../config/main");
const passport = require("passport");
const auth_1 = require("../middlewares/auth");
function _attachCoreMiddlewares(app) {
    return __awaiter(this, void 0, void 0, function* () {
        const config = main_1.initConfig();
        app.use(morgan(process.env.NODE_ENV));
        app.use(passport.initialize());
        auth_1.useJwt(passport);
        app.use(cors());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        try {
            yield mongoose.connect(config.dbConnectionString, {
                useNewUrlParser: true
            });
        }
        catch (e) {
            // TODO implement DbCOnnectionError
            console.error("Can not connect to MongoDB", e);
        }
    });
}
let _appInstance = null;
function getAppInstance() {
    if (!!_appInstance)
        return _appInstance;
    _appInstance = express();
    _attachCoreMiddlewares(_appInstance);
    return _appInstance;
}
exports.getAppInstance = getAppInstance;
//# sourceMappingURL=server.js.map