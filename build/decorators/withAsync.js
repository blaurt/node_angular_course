"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function withAsync(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}
exports.withAsync = withAsync;
//# sourceMappingURL=withAsync.js.map