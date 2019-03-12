"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
function _attachCoreMiddlewares(app) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    return app;
}
let _appInstance = null;
function getAppInstance() {
    if (!!_appInstance)
        return _appInstance;
    _appInstance = _attachCoreMiddlewares(express());
    return _appInstance;
}
exports.getAppInstance = getAppInstance;
//# sourceMappingURL=app.js.map