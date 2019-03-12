"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(err, res) {
    console.error(err);
    res.status(500);
}
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map